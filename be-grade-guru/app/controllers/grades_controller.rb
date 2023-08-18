class GradesController < ApplicationController
    skip_before_action :confirm_authentication
    skip_before_action :verify_authenticity_token

    
    def update
        #find each grade by id and update the grade
        grades_data = params[:_json]

        puts "grade_value: #{grades_data[1]}"

        updated_grades = grades_data.each.with_index do |data, index|
            grade = data["grade"]
            puts "grade#{index}: #{grade}"
            grade_id = grade["id"].to_i
            puts "grade_id: #{grade_id}"
            # grade_id = grade["id"].to_i
            # puts "grade_id: #{grade_id}"
            # puts "grade_id: #{grade_id}"
            # new_grade_value = data["grade"]["grade"].to_i
            # puts "new_grade_value: #{new_grade_value}"

            # grade = Grade.find(grade_id)
            # grade.update(grade: new_grade_value)

            # data
        end

        if updated_grades
            render json: updated_grades
        else
            render json: {error: "Something went wrong"}
        end

    end

    private

    def grade_params
        params.require(:skill).permit(grade: :grade)
    end
end
