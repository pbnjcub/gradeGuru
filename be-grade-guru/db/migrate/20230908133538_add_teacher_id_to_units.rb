class AddTeacherIdToUnits < ActiveRecord::Migration[7.0]
  def change
    add_column :units, :teacher_id, :integer
  end
  
end
