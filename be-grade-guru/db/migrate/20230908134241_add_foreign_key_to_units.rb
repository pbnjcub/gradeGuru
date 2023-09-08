class AddForeignKeyToUnits < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :units, :users, column: :teacher_id
  end
end
