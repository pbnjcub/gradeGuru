class ChangeDescriptionDataTypeInUnits < ActiveRecord::Migration[7.0]
  def change
    change_column :units, :description, :text
  end
end
