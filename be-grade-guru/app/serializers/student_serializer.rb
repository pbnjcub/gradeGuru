class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :student_feedbacks

  has_many :student_feedbacks, serializer: FeedbackSerializer
end
