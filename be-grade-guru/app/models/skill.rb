class Skill < ApplicationRecord
    
    belongs_to :unit
    has_many :grades, dependent: :destroy

    validates :title, presence: true, uniqueness: true
    validates :description, presence: true, uniqueness: true
end
