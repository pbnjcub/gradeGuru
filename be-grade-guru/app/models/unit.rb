class Unit < ApplicationRecord
    has_many :skills
    has_many :feedbacks
    has_many :teachers, through: :feedbacks, source: :user, conditions: { role: :teacher }
    has_many :students, through: :feedbacks, source: :user, conditions: { role: :student }
    has_many :parents, through: :feedbacks, source: :user, conditions: { role: :parent }
  
    
end
