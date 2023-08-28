class Family < ApplicationRecord
    belongs_to :parent, class_name: 'User', foreign_key: :parent_id
    belongs_to :student, class_name: 'User', foreign_key: :student_id

end