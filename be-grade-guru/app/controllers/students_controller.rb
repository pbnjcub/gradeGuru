class StudentsController < ApplicationController
    skip_before_action :confirm_authentication

    def show
        student = User.find(params[:id])

        feedbacks = student.feedbacks
        grades = student.grades

        student_obj = {}

        skills = grades.map do |grade|
            grade.skill = Skill.find(grade.skill_id)
            grade.skill.as_json
        end

        units = feedbacks.map do |feedback|
            feedback.unit = Unit.find(feedback.unit_id)
            feedback.unit.as_json
        end

        units_with_skill_and_feedback = units.map do |unit|
            unit_feedbacks = feedbacks.select {|feedback| feedback.unit_id == unit["id"]}
            unit_skills = skills.select {|skill| skill["unit_id"] == unit["id"]}
            unit_skills_with_grade = unit_skills.map do |skill|
                grade = grades.find {|grade| grade.skill_id == skill["id"]}
                {skill: skill, grade: grade.grade}
            end
            {unit: unit, feedbacks: unit_feedbacks, skills: unit_skills_with_grade}
        end

        { student: student, feedbacks: feedbacks, grades: grades, skills: skills, units: units }

        render json: { student: student, units_with_skill_and_feedback: units_with_skill_and_feedback }



    end


    def get_feedback_and_grades
        student = User.find(params[:student_id])
        units = Unit.all
        student_feedbacks_and_grades = []
      
        units.each do |unit|
          skills = unit.skills
          student_skills_and_grades_array = []
      
          skills.each do |skill|
            grade = skill.grades.find_by(student_id: student.id)
            if grade
              student_skills_and_grades_array << { skill: skill, grade: grade }
            end
          end
      
          student_feedbacks = student.feedbacks.where(unit_id: unit.id)
          student_feedbacks_and_grades << { unit: unit, skills_and_grades: student_skills_and_grades_array, feedbacks: student_feedbacks }
        end
      
        render json: { student: student, feedbacks_and_grades_for_units: student_feedbacks_and_grades }.except(:created_at, :updated_at, :password_digest, :email, :role, :id)
      end
    end   

# def get_feedback_and_grades
#     student = User.find(params[:student_id])
#     unit = Unit.find(params[:unit_id])
#     skills = unit.skills
#     student_skills_and_grades_array = []
#     # student_feedbacks = []
#     skills.each do |skill|
#         skill.grades.each do |grade|
#             if grade.student_id == student.id
#                 student_skills_and_grades_array << { skill: skill, grade: grade }
#             end
#         end
#     end
#     #I want to return the associated feedbacks with the student object.
#     student_feedbacks = student.feedbacks.where(unit_id: unit.id)

#     student_object = { student: student, skills_and_grades: student_skills_and_grades_array, feedbacks: student_feedbacks }.except(:created_at, :updated_at, :password_digest, :email, :role, :id)
    

#     render json: student_object
#     end
# end