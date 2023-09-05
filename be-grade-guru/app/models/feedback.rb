class Feedback < ApplicationRecord
    belongs_to :student, class_name: 'User', foreign_key: 'student_id'
    belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
    belongs_to :unit
    
    validates :written_work, presence: true, numericality: { only_integer: true }
    validates :classwork, presence: true, numericality: { only_integer: true }
    validates :homework, presence: true, numericality: { only_integer: true }



end
