class CreateSkills < ActiveRecord::Migration[7.0]
  def change
    create_table :skills do |t|
      t.integer :unit_id
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
