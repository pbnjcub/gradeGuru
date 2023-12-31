class FeedbacksController < ApplicationController
    # skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token
    load_and_authorize_resource
    def index
        feedbacks = Feedback.all
        render json: feedbacks, each_serializer: FeedbackSerializer
    end

    def create
        feedback = Feedback.create(feedback_params)

        if feedback
            render json: feedback, status: :created
        else
            render json: {errors: feedback.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        @feedback = Feedback.find(params[:id])

        if current_user.student? && @feedback.student_id != current_user.id
            render json: { error: 'Not authorized.' }, status: 400
        elsif current_user.teacher? && @feedback.teacher_id != current_user.id
            render json: { error: 'Not authorized.' }, status: 400
        else
            render json: @feedback, status: :created, serializer: FeedbackSerializer
        end
    end
      
    def update
        feedback = Feedback.find(params[:id])
      
        if feedback.update(feedback_params)
            render json: feedback, status: :created
        else
            render json: {errors: feedback.errors.full_messages}, status: :unprocessable_entity        end
    end

    def destroy
        feedback = Feedback.find(params[:id])

        if feedback.destroy
            head :no_content
        else
            render json: {errors: feedback.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def feedback_params
        params.require(:feedback).permit(:written_work, :classwork, :homework, :comment)
    end
    
end
