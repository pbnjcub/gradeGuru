class Skill < ApplicationRecord
    
    belongs_to :unit
    has_many :grades, dependent: :destroy

    validates :title, presence: true
    validates :description, presence: true
end
