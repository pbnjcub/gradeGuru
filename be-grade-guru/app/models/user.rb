class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :role, presence: true


    ROLES = ['teacher', 'admin', 'student', 'parent'].freeze

    validates :role, presence: true, inclusion: { in: ROLES }

    def teacher?
        role == 'teacher'
    end

    def admin?
        role == 'admin'
    end

    def student?
        role == 'student'
    end

    def parent?
        role == 'parent'
    end

    has_many :teacher_feedbacks, foreign_key: :teacher_id, class_name: 'Feedback', dependent: :destroy
    has_many :student_feedbacks, foreign_key: :student_id, class_name: 'Feedback', dependent: :destroy

end
