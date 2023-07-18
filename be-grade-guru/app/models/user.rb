class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    has_secure_password

    enum role: [ teacher: 0, student: 1, parent: 2]

    has_many :feedbacks
    has_many :families, dependent: :destroy, foreign_key: :parent_id
    has_many :students, through: :families, source: :student

    has_many :reverse_families, class_name: 'Family', foreign_key: :student_id_key: :student_id_key
    has_many :parents, through: :reverse_families, source: :parent

end
