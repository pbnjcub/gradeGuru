class AddForeignKeyToFeedbacks < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :feedbacks, :users, column: :teacher_id
    add_foreign_key :feedbacks, :users, column: :student_id
  end
end
