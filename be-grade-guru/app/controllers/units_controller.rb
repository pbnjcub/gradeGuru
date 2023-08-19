class UnitsController < ApplicationController
    skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token

    def create
        puts params
        @unit = Unit.create(unit_params)

        @teacher_id = params[:teacher_id].to_i

        puts @teacher_id
        if @unit
            create_empty_feedbacks
            render json: @unit, status: :ok
        else
            render json: { errors: 'unit not created' }, status: :unprocessable_entity
        end
    end

    def destroy
        unit = Unit.find(params[:id])
        
        if unit
            unit.destroy
            head :no_content
        else
            render json: {error: "unit not found"}
        end
    end

    private
    def unit_params
        params.require(:unit).permit(:title, :description, :teacher_id)
    end

    def create_empty_feedbacks
        teacher = Teacher.find(@teacher_id)
        puts "teacher: #{teacher.inspect}"
        
        teacher_feedbacks = Feedback.where(teacher_id: teacher.id)

        puts "teacher feedback count: #{teacher_feedbacks}"
        #i want to retrieve the student ids associated with the feedbacks associated with the teacher_id
        student_ids_taught = teacher_feedbacks.pluck(:student_id).uniq

        puts "student_ids_taught: #{student_ids_taught}"

        student_ids_taught.each do |student_id|
            Feedback.create(unit_id: @unit.id, teacher_id: @teacher_id, student_id: student_id)
        end

    end
end
