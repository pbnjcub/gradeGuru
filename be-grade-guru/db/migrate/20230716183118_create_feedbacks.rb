class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.integer :user_id
      t.integer :unit_id
      t.integer :written_work
      t.integer :classwork
      t.integer :homework

      t.timestamps
    end
  end
end
