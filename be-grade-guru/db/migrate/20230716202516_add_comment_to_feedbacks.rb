class AddCommentToFeedbacks < ActiveRecord::Migration[7.0]
  def change
    add_column :feedbacks, :comment, :text
  end
end
