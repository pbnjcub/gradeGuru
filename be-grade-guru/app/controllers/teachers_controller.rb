class TeachersController < ApplicationController
    def students
      if current_user.role == 'teacher'
        teacher_students = current_user.students
        render json: teacher_students, status: :ok
      else
        render json: { errors: 'You are not authorized to access this information.' }, status: :forbidden
      end
    end
  end
  
