class CreateFamilies < ActiveRecord::Migration[7.0]
  def change
    create_table :families do |t|
      t.references :parent, foreign_key: { to_table: :users }
      t.references :student, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
