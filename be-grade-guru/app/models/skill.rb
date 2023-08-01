class Skill < ApplicationRecord
    belongs_to :unit
    has_many :grades, dependent: :destroy
end
