class Skill < ApplicationRecord
    belongs_to :Unit
    has_many :grades, dependent: :destroy
end
