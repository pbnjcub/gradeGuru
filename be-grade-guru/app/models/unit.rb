class Unit < ApplicationRecord
    belongs_to :teacher, -> { where(role: 'teacher') }
    has_many :feedbacks, dependent: :destroy
    has_many :skills, dependent: :destroy
    has_many :grades, through: :skills

    has_many :students, -> { where(role: 'student') }, through: :feedbacks, source: :user
    has_many :parents, -> { where(role: 'parent') }, through: :feedbacks, source: :user

    validates :title, presence: true
    validates :description, presence: true
  
    
end
