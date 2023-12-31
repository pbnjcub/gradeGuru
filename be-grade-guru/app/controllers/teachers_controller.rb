class TeachersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def get_students
    teacher = User.find(params[:id])
    authorize! :read, teacher
    teacher_feedbacks = teacher.teacher_feedbacks
    students = teacher_feedbacks.map { |feedback| feedback.student}.uniq
    render json: students, each_serializer: StudentSerializer
  end
end
  
