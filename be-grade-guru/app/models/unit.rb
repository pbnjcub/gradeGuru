class Unit < ApplicationRecord
    has_many :skills
    has_many :feedbacks
    has_many :teachers, -> { where(role: 'teacher') }, through: :feedbacks, source: :user
    has_many :students, -> { where(role: 'student') }, through: :feedbacks, source: :user
    has_many :parents, -> { where(role: 'parent') }, through: :feedbacks, source: :user

    validates :title, presence: true, uniqueness: true
    validates :description, presence: true
  
    
end
