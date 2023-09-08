class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true

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

    # has_many :teacher_feedbacks, foreign_key: :teacher_id, class_name: 'Feedback', dependent: :destroy
    # has_many :feedbacks, foreign_key: 'student_id', dependent: :destroy
    # has_many :grades, foreign_key: :student_id, class_name: 'Grade', dependent: :destroy
    # # has_many :teacher_grades, foreign_key: :teacher_id, class_name: 'Grade', dependent: :destroy
    # has_many :families, foreign_key: :parent_id, class_name: 'Family'
    # has_many :students, through: :families, dependent: :destroy

        # Feedback related associations
    has_many :teacher_feedbacks, class_name: 'Feedback', foreign_key: :teacher_id, dependent: :destroy
    has_many :student_feedbacks, class_name: 'Feedback', foreign_key: :student_id, dependent: :destroy

    # Grade related associations
    has_many :grades, class_name: 'Grade', foreign_key: :student_id, dependent: :destroy
    # has_many :teacher_grades, class_name: 'Grade', foreign_key: :teacher_id, dependent: :destroy

    # Family related associations for parent and student roles
    has_many :parent_families, class_name: 'Family', foreign_key: :parent_id, dependent: :destroy
    has_many :student_families, class_name: 'Family', foreign_key: :student_id, dependent: :destroy

    # Associations to get students for a parent and parents for a student
    has_many :students, through: :parent_families, source: :student
    has_many :parents, through: :student_families, source: :parent

end
