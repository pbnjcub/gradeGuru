class FeedbacksController < ApplicationController
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

    def update
        @feedback = Feedback.find(params[:id])
        authorize! :update, @feedback
    
        if @feedback.update(feedback_params)
            render json: feedback
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
        params.permit(:unit_id, :teacher_id, :written_work, :classwork, :homework, :comment)
    end
end
