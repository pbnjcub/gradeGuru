class SkillsController < ApplicationController
    skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token

    def update
        skill = Skill.find(params[:id])

        if skill
            skill.update(skill_params)
            render json: skill
        else
            render json: {error: "Something went wrong"}
        end
    end

    private

    def skill_params
        params.require(:skill).permit(:title, :description, :unit_id, :teacher_id)
      end
      
    
end
