class SkillSerializer < ActiveModel::Serializer
  attributes :id, :unit_id, :title, :description, :grades

  has_many :grades
end
