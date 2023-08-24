class ParentsController < ApplicationController
    skip_before_action :confirm_authentication

    def show
        parent = User.find(params[:id])
        families = parent.families

        students = families.map do |family|
            student = User.find(family.student_id)

            feedbacks = student.feedbacks
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
            { student: student, units_with_skill_and_feedback: units_with_skill_and_feedback }
        end

        render json: students
      end
end
