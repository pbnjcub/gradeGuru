class UnitSerializer < ActiveModel::Serializer
  attributes :id, :title, :description

  has_many :skills
  # has_many :feedbacks
  has_many :grades, through: :skills
end
