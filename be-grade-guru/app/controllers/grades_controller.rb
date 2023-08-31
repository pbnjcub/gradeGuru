class GradesController < ApplicationController
    # skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token

    load_and_authorize_resource

    def update
        grades_data = params[:_json]

        updated_grades = grades_data.each.with_index do |data, index|
            grade = data["grade"]
            grade_id = grade["id"]
            new_grade_value = grade["grade"]

            grade = Grade.find(grade_id)
            grade.update(grade: new_grade_value)
        end

        if updated_grades
            render json: updated_grades
        else
            render json: {errors: feedback.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def grade_params
        params.require(:skill).permit(grade: :grade)
    end
end
