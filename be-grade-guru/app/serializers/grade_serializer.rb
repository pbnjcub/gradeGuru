class GradeSerializer < ActiveModel::Serializer
  attributes :id, :grade, :student_id, :skill_id

  belongs_to :student, serializer: UserSerializer
  belongs_to :skill
end
