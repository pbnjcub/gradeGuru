class FeedbackSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :unit_id, :written_work, :classwork, :homework, :comment

  belongs_to :teacher, serializer: UserSerializer
  belongs_to :student, serializer: UserSerializer
end
