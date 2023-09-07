class StudentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    # load_and_authorize_resource
    # authorize_resource :user, class: 'User'
  
    def show
      student = User.find(params[:id])
      authorize! :read, student
      teacher_id = params[:teacher_id].to_i
      
      feedbacks = student.feedbacks.where(teacher_id: teacher_id)
      grades = student.grades
      
      skills = grades.map do |grade|
        grade.skill = Skill.find(grade.skill_id)
        grade.skill.as_json(except: [:created_at, :updated_at])
      end
      
      units = feedbacks.map do |feedback|
        feedback.unit = Unit.find(feedback.unit_id)
        feedback.unit.as_json(except: [:created_at, :updated_at])
      end
      
      units_with_skill_and_feedback = units.map do |unit|
        unit_feedbacks = feedbacks.select { |feedback| feedback.unit_id == unit["id"] }
        unit_skills = skills.select { |skill| skill["unit_id"] == unit["id"] }
        unit_skills_with_grade = unit_skills.map do |skill|
          grade = grades.find { |grade| grade.skill_id == skill["id"] }
          { skill: skill, grade: grade }
        end
        { unit: unit, feedbacks: unit_feedbacks, skills: unit_skills_with_grade }
      end
      
      render json: { student: student.as_json(except: [:password_digest, :created_at, :updated_at]), units_with_skill_and_feedback: units_with_skill_and_feedback.as_json(except: [:created_at, :updated_at]) }
    end  


  def get_student_data
    @user = User.find(params[:id])
    authorize! :read, @user
    feedbacks = @user.feedbacks
    grades = @user.grades
    
    skills = grades.map do |grade|
      grade.skill = Skill.find(grade.skill_id)
      grade.skill.as_json
    end
    
    units = feedbacks.map do |feedback|
      feedback.unit = Unit.find(feedback.unit_id)
      feedback.unit.as_json
    end
    
    units_with_skill_and_feedback = units.map do |unit|
      unit_feedbacks = feedbacks.select { |feedback| feedback.unit_id == unit["id"] }
      feedback = unit_feedbacks.first
      teacher_id = feedback["teacher_id"]
      teacher = User.find(teacher_id)
      unit_skills = skills.select { |skill| skill["unit_id"] == unit["id"] }
      unit_skills_with_grade = unit_skills.map do |skill|
        grade = grades.find { |grade| grade.skill_id == skill["id"] }
        { skill: skill, grade: grade }
      end
      { unit: unit, teacher: teacher, feedbacks: unit_feedbacks, skills: unit_skills_with_grade }

    end
    
    sorted_units = units_with_skill_and_feedback.sort_by do |unit|
      feedback = unit[:feedbacks].first 
      feedback[:teacher_id]
    end
      
    render json: { student: @user, sorted_units: sorted_units }
  end

  def enroll_students
    authorize! :enroll, User
    @student_ids = params[:student_ids]
    @teacher_id = params[:teacher_id]

    @teacher = User.find(@teacher_id)

    if @teacher.teacher_feedbacks.pluck(:unit_id).uniq.empty?
      render json: { error: "The teacher doesn't have any units assigned. Assign units to the teacher before enrolling students." }, status: :unprocessable_entity
      return
    end

    create_empty_feedbacks
    create_empty_grades
    students = User.where(id: @student_ids)    
   
    render json: students
  end

  def unenroll_student
    authorize! :unenroll, User
    student_id = params[:student_id]
    teacher_id = params[:teacher_id]

    feedbacks = Feedback.where(student_id: student_id, teacher_id: teacher_id)

    if feedbacks.empty?
      render json: { error: "The student is not enrolled under this teacher." }, status: :unprocessable_entity
      return
    end
  
    Feedback.where(student_id: student_id, teacher_id: teacher_id).destroy_all
  
    Grade.where(student_id: student_id, teacher_id: teacher_id).destroy_all
    student = User.find(student_id)
    render json: student
  end
  
 
  private

  def student_params
    params.require(:student)
  end

  def create_empty_feedbacks
    teacher_unit_ids = @teacher.teacher_feedbacks.pluck(:unit_id).uniq

    @student_ids.each do |student_id|
      teacher_unit_ids.each do |unit_id|
        Feedback.create(unit_id: unit_id, teacher_id: @teacher_id, student_id: student_id, written_work: 0, classwork: 0, homework: 0)
      end
    end
  end

  def create_empty_grades
    teacher_unit_ids = @teacher.teacher_feedbacks.pluck(:unit_id).uniq

    teacher_skill_ids = Skill.where(unit_id: teacher_unit_ids).pluck(:id)

    if teacher_skill_ids.any?
      @student_ids.each do |student_id|
        teacher_skill_ids.each do |skill_id|
          Grade.create(skill_id: skill_id, student_id: student_id, teacher_id: @teacher_id, grade: 0)
        end
      end
    end
  end

end
  