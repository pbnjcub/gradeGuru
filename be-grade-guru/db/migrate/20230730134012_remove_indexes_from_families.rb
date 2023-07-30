class RemoveIndexesFromFamilies < ActiveRecord::Migration[7.0]
  def change
    remove_index :families, name: "index_families_on_parent_id"
    remove_index :families, name: "index_families_on_student_id"
  end
end
