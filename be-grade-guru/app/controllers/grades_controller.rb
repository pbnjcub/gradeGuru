class GradesController < ApplicationController
    # skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token

    load_and_authorize_resource

    def update
        grades_data = params[:_json]
    
        updated_grades = []
        failed_updates = []
    
        grades_data.each do |data|
            grade_data = data["grade"]
            grade_id = grade_data["id"]
            new_grade_value = grade_data["grade"]
    
            grade = Grade.find(grade_id)
    
            if grade.update(grade: new_grade_value)
                updated_grades << grade
            else
                failed_updates << { grade: grade, errors: grade.errors.full_messages }
            end
        end
    
        if failed_updates.empty?
            render json: updated_grades
        else
            render json: { errors: failed_updates }, status: :unprocessable_entity
        end
    end
    

    private

    def grade_params
        params.require(:skill).permit(grade: :grade)
    end
end
