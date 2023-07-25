class CreateGrades < ActiveRecord::Migration[7.0]
  def change
    create_table :grades do |t|
      t.references :student, null: false, foreign_key: { to_table: :users}
      t.references :teacher, null: false, foreign_key: { to_table: :users}
      t.references :skill, null: false, foreign_key: true
      t.integer :grade

      t.timestamps
    end
  endts
end
