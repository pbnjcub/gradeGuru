class StudentsController < ApplicationController
    skip_before_action :confirm_authentication

  def get_feedback_and_grades
    student = User.find(params[:student_id])
    unit = Unit.find(params[:unit_id])
    skills = unit.skills
    student_skills_and_grades_array = []
    # student_feedbacks = []
    skills.each do |skill|
        skill.grades.each do |grade|
            if grade.student_id == student.id
                student_skills_and_grades_array << { skill: skill, grade: grade }
            end
        end
    end
    #I want to return the associated feedbacks with the student object.
    student_feedbacks = student.feedbacks.where(unit_id: unit.id)

    student_object = { student: student, skills_and_grades: student_skills_and_grades_array, feedbacks: student_feedbacks }.except(:created_at, :updated_at, :password_digest, :email, :role, :id)
    

    render json: student_object
    end
end
