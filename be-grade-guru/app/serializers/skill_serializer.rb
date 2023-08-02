class SkillSerializer < ActiveModel::Serializer
  attributes :id, :unit_id, :title, :description

  has_many :grades
end
