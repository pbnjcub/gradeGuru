class Student < User
    has_many :grades, foreign_key: :student_id, class_name: 'Grade', dependent: :destroy
    has_many :feedbacks, foreign_key: :student_id, class_name: 'Feedback', dependent: :destroy
end
