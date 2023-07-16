class Feedback < ApplicationRecord
    belongs_to :user
    belongs_to :unit
    validates :written_work, presence: true
    validates :classwork, presence: true
    validates :homework, presence: true
end
