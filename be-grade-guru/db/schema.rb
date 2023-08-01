# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_30_211957) do
  create_table "families", force: :cascade do |t|
    t.integer "parent_id"
    t.integer "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.integer "unit_id"
    t.integer "written_work"
    t.integer "classwork"
    t.integer "homework"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "comment"
    t.integer "teacher_id"
    t.integer "student_id"
  end

  create_table "grades", force: :cascade do |t|
    t.integer "student_id", null: false
    t.integer "teacher_id", null: false
    t.integer "skill_id", null: false
    t.integer "grade"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.integer "unit_id"
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "units", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "last_name"
    t.string "first_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "role", default: "teacher"
  end

  add_foreign_key "families", "users", column: "parent_id"
  add_foreign_key "families", "users", column: "student_id"
  add_foreign_key "feedbacks", "users", column: "student_id"
  add_foreign_key "feedbacks", "users", column: "teacher_id"
  add_foreign_key "grades", "users", column: "student_id"
  add_foreign_key "grades", "users", column: "teacher_id"
end
