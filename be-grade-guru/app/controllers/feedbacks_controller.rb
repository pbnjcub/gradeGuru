class FeedbacksController < ApplicationController
    skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token, only: [:create]

    def index
        feedbacks = Feedback.all
        render json: feedbacks
    end

    def show
        @feedback = Feedback.find(params[:id])
        authorize! :read, @feedback

        if current_user.student? && @feedback.student_id != current_user.id
            render json: { error: 'Not authorized.' }, status: 400
        elsif current_user.teacher? && @feedback.teacher_id != current_user.id
            render json: { error: 'Not authorized.' }, status: 400
        else
            render json: @feedback
        end
    end

    def create
        @feedback = Feedback.new(feedback_params)
        authorize! :create, @feedback

        if @feedback.save
            render json: @feedback
        else
            render json: { error: 'Not authorized.' }, status: 400
        end
    end

    # def update
    #     @feedback = Feedback.find(params[:id])
    #     # authorize! :update, @feedback
      
    #     if @feedback.update(feedback_params)
    #       student = User.find(@feedback.student_id)
    #       teacher_id = @feedback.teacher_id
      
    #       feedbacks = student.feedbacks.where(teacher_id: teacher_id)
    #       grades = student.grades
      
    #       skills = grades.map do |grade|
    #         grade.skill = Skill.find(grade.skill_id)
    #         grade.skill.as_json
    #       end
      
    #       units = feedbacks.map do |feedback|
    #         feedback.unit = Unit.find(feedback.unit_id)
    #         feedback.unit.as_json
    #       end
      
    #       units_with_skill_and_feedback = units.map do |unit|
    #         unit_feedbacks = feedbacks.select { |feedback| feedback.unit_id == unit["id"] }
    #         unit_skills = skills.select { |skill| skill["unit_id"] == unit["id"] }
    #         unit_skills_with_grade = unit_skills.map do |skill|
    #           grade = grades.find { |grade| grade.skill_id == skill["id"] }
    #           { skill: skill, grade: grade.grade }
    #         end
    #         { unit: unit, feedbacks: unit_feedbacks, skills: unit_skills_with_grade }
    #       end
      
    #       render json: { student: student, units_with_skill_and_feedback: units_with_skill_and_feedback }
    #     else
    #       render json: { error: 'Not authorized.' }, status: 400
    #     end
    #   end
      

    def update
        @feedback = Feedback.find(params[:id])
        # authorize! :update, @feedback
        feedback_params_obj = feedback_params.feedback
        puts feedback_params_obj
        if @feedback.update(feedback_params_obj)
            render json: @feedback
        else
            render json: { error: 'Not authorized.' }, status: 400
        end
    end

    def destroy
        @feedback = Feedback.find(params[:id])
        authorize! :destroy, @feedback

        if @feedback.destroy
            render json: { message: 'Feedback deleted.' }
        else
            render json: { error: 'Not authorized.' }, status: 400
        end
    end

    private

    def feedback_params
        params.permit(:id, :written_work, :classwork, :homework, :comment)
    end
end
