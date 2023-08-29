class Feedback < ApplicationRecord
    belongs_to :student, class_name: 'User', foreign_key: 'student_id'
    belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
    belongs_to :unit

    validates :written_work, numericality: { only_integer: true, allow_nil: true }
    validates :classwork, numericality: { only_integer: true, allow_nil: true }
    validates :homework, numericality: { only_integer: true, allow_nil: true }



end
