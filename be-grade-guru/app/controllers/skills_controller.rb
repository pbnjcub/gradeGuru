class SkillsController < ApplicationController
    # skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token
    load_and_authorize_resource

    def create
        @skill = Skill.new(skill_params)
        @skill_id = @skill.id
        @teacher_id = params[:teacher_id].to_i

        @unit_id = params[:unit_id]
    
        if @skill.save
            create_empty_grades
            render json: @skill
        else
            render json: {errors: @skill.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        skill = Skill.find(params[:skill_id])

        if skill
            if skill.update(skill_params)
                render json: skill
            else
                render json: {errors: skill.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: {errors: "Skill not found"}
        end
    end

    def destroy
        skill = Skill.find(params[:skill_id])
        if skill
            skill.destroy
            head :no_content
        else
            render json: {errors: "Skill not found"}
        end
    end


    private

    def skill_params
        params.require(:skill).permit(:title, :description, :unit_id, :teacher_id)
    end

    def create_empty_grades
        teacher = Teacher.find(@teacher_id)
        
        teacher_feedbacks = Feedback.where(teacher_id: teacher.id)

        student_ids_taught = teacher_feedbacks.pluck(:student_id).uniq

        student_ids_taught.each do |student_id|
            Grade.create(skill_id: @skill.id, teacher_id: @teacher_id, student_id: student_id)
        end

    end
      
    
end
