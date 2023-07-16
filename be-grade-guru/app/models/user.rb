class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    has_secure_password

    enum role: [ teacher: 0, student: 1, parent: 2]

    has_many :feedbacks

end
