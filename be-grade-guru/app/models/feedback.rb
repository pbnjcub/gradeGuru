class Feedback < ApplicationRecord
    belongs_to :student, class_name: 'User', foreign_key: 'student_id'
    belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
    belongs_to :unit
    validates :written_work, presence: true
    validates :classwork, presence: true
    validates :homework, presence: true
end
