class RemoveUserIdFromFeedbacks < ActiveRecord::Migration[7.0]
  def change
    remove_column :feedbacks, :user_id, :integer
  end
end
