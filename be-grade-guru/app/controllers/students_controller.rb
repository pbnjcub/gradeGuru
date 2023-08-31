class StudentsController < ApplicationController
    # skip_before_action :confirm_authentication
    # load_and_authorize_resource
    authorize_resource :user, class: 'User'
  
    def show
      student = User.find(params[:id])
      authorize! :read, student
      teacher_id = params[:teacher_id].to_i
      
      feedbacks = student.feedbacks.where(teacher_id: teacher_id)
      grades = student.grades
      
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
        unit_skills = skills.select { |skill| skill["unit_id"] == unit["id"] }
        unit_skills_with_grade = unit_skills.map do |skill|
          grade = grades.find { |grade| grade.skill_id == skill["id"] }
          { skill: skill, grade: grade }
        end
        { unit: unit, feedbacks: unit_feedbacks, skills: unit_skills_with_grade }
      end
      
      render json: { student: student, units_with_skill_and_feedback: units_with_skill_and_feedback }
    end

    # def get_student_data
    #   student = User.includes(feedbacks: [:teacher, { unit: :skills }], grades: { skill: :unit }).find(params[:id])
    #   authorize! :read, student
    #   units_with_skill_and_feedback = student.feedbacks.group_by(&:unit).map do |unit, unit_feedbacks|
    #     unit_skills_with_grade = unit.skills.map do |skill|
    #       grade = student.grades.find { |grade| grade.skill_id == skill.id }
    #       { skill: skill, grade: grade }
    #     end
    
    #     teacher = unit_feedbacks.first.teacher
    
    #     { unit: unit, teacher: teacher, feedbacks: unit_feedbacks, skills: unit_skills_with_grade }
    #   end
    
    #   sorted_units = units_with_skill_and_feedback.sort_by { |unit| unit[:feedbacks].first.teacher_id }
    
    #   render json: { student: student, sorted_units: sorted_units }
    # end
    


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


end
  