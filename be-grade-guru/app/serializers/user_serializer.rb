class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :role


  has_many :grades, if: -> { object.role == 'student'}
  has_many :student_feedbacks, if: -> { object.role == 'student'}
  has_many :teacher_feedbacks, if: -> { object.role == 'teacher'}
  has_many :parent_families, if: -> {object.role == 'parent'}
  has_many :student_families, if: -> {object.role == 'student'}
  has_many :units, if: -> { object.role == 'teacher'}
end
