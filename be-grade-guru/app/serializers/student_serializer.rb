class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email
  # has_many :grades, foreign_key: :student_id, dependent: :destroy
  # has_many :feedbacks, foreign_key: :student_id, class_name: 'Feedback', dependent: :destroy
end
