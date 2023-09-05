class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email

  has_many :feedbacks, serializer: FeedbackSerializer
end
