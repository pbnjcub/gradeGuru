class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :role
  has_many :grades, if: -> { object.role == 'student'}
  has_many :feedbacks, if: -> { object.role == 'student'}
end
