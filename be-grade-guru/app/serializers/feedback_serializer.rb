class FeedbackSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :unit_id, :written_work, :classwork, :homework, :comment
end
