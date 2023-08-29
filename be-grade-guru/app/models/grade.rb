class Grade < ApplicationRecord
  belongs_to :student, class_name: 'User', foreign_key: 'student_id'
  belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
  belongs_to :skill

  validates :student_id, presence: true
  validates :teacher_id, presence: true
  validates :skill_id, presence: true
  # validates :grade, numericality, { only_integer: true, allow_nil: true }
end
