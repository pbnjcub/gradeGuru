class RemoveForeignKeyFromGrades < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :grades, :skills
  end
end
