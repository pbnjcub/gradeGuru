class UnitSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :skills

  has_many :skills, serializer: SkillSerializer
  has_many :feedbacks, serializer: FeedbackSerializer
  has_many :grades, through: :skills
end
