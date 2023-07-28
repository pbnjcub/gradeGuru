class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true


    ROLES = ['teacher', 'student', 'parent'].freeze

    validates :role, presence: true, inclusion: { in: ROLES }

    def teacher?
        role == 'teacher'
    end

    def student?
        role == 'student'
    end

    def parent?
        role == 'parent'
    end

    has_many :feedbacks, foreign_key: :teacher_id, class_name: 'Feedback', dependent: :destroy
    has_many :assigned_feedbacks, foreign_key: :student_id, class_name: 'Feedback', dependent: :destroy
    has_many :families, dependent: :destroy, foreign_key: :parent_id
    has_many :students, through: :families, source: :student

    has_many :reverse_families, class_name: 'Family', foreign_key: :student_id_key
    has_many :parents, through: :reverse_families, source: :parent

    has_many :grades, foreign_key: :student_id, dependent: :destroy

end
