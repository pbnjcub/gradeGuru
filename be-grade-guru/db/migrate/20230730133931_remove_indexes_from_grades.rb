class RemoveIndexesFromGrades < ActiveRecord::Migration[7.0]
  def change
    remove_index :grades, name: "index_grades_on_skill_id"
    remove_index :grades, name: "index_grades_on_student_id"
    remove_index :grades, name: "index_grades_on_teacher_id"
  end
end
