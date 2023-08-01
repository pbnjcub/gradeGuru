class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :role
  # has_many :feedbacks, foreign_key: :teacher_id, class_name: 'Feedback', dependent: :destroy
  # has_many :assigned_feedbacks, foreign_key: :student_id, class_name: 'Feedback', dependent: :destroy
  # has_many :students, through: :feedbacks
  # has_many :units, through: :feedbacks
  # has_many :grades, foreign_key: :student_id, dependent: :destroy  
end
