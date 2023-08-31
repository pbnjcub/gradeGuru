# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

users_data = [
    {
    last_name: "Jung",
    first_name: "Paul",
    email: "pauljung@example.com",
    password: "pauljung",
    role: "teacher"
    },
    {
    last_name: "Tausner",
    first_name: "Ben",
    email: "bentausner@example.com",
    password: "bentausner",
    role: "student"
    },
    {
    last_name: "Tausner",
    first_name: "Sam",
    email: "samtausner@example.com",
    password: "samtausner",
    role: "student"
    },
    {
    last_name: "Tausner",
    first_name: "Liz",
    email: "liztausner@example.com",
    password: "liztausner",
    role: "parent"
    },
    {
    last_name: "Patel",
    first_name: "Pooja",
    email: "poojapatel@example.com",
    password: "poojapatel",
    role: "teacher"
    },
    {
    last_name: "McCullough",
    first_name: "Paige",
    email: "paigemccullough@example.com",
    password: "paigemccullough",
    role: "student"
    },
    {
    last_name: "McCullough",
    first_name: "Lukas",
    email: "lukasmccullough@example.com",
    password: "lukasmccullough",
    role: "student"
    },
    {
    last_name: "Christoph",
    first_name: "Kathy",
    email: "kathychristoph@example.com",
    password: "kathychristoph",
    role: "admin"
    },
    {
    last_name: "McCullough",
    first_name: "Michelle",
    email: "michellemccullough@example.com",
    password: "michellemccullough",
    role: "parent"
    }
]

users_data.each do |user|
    User.create!(user)
end

units_data = [
  {
    title: "Rational Number Operations",
    description: "Operations with Negative and Positive Rational Numbers"
  },
  {
    title: "Poetry",
    description: "Introduction to how to analyze a poem."
  },
  {
    title: "Algebraic Skills",
    description: "Operations with Variables and Algebraic Expressions"
  },
  {
    title: "Creative Writing",
    description: "Learning the Building Blocks of Creative Writing"
  },
]

units_data.each do |unit_data|
    Unit.create!(unit_data)
end

feedback_data = [
  {
    unit_id: 1,
    written_work: 90,
    classwork: 90,
    homework: 95,
    comment: "Great job this unit, Ben! You've got this! You're doing great!",
    teacher_id: 1,
    student_id: 2
  },
  {
    unit_id: 1,
    written_work: 80,
    classwork: 95,
    homework: 92,
    comment: "Great job this unit, Sam! You continue to do so well!",
    teacher_id: 1,
    student_id: 3
  },
  {
    unit_id: 2,
    written_work: 98,
    classwork: 95,
    homework: 100,
    comment: "Great job this unit, Paige!",
    teacher_id: 5,
    student_id: 7
  },
  {
    unit_id: 2,
    written_work: 82,
    classwork: 75,
    homework: 75,
    comment: "Lukas, you need to put more effort in. Come see me for extra help.",
    teacher_id: 5,
    student_id: 8
  },
  {
    unit_id: 3,
    written_work: 85,
    classwork: 80,
    homework: 80,
    comment: "You can do better, Ben! You've got this!",
    teacher_id: 1,
    student_id: 2
  },
  {
    unit_id: 4,
    written_work: 98,
    classwork: 100,
    homework: 100,
    comment: "Great job on the Creative Writing unit, Sam!",
    teacher_id: 5,
    student_id: 3
  },
]

feedback_data.each do |feedback|
    Feedback.create!(feedback)
end


skills_data = [
  {
    unit_id: 1,
    title: "Integer Addition",
    description: "Adding positive and negative whole numbers"
  },
  {
    unit_id: 1,
    title: "Integer Subtraction",
    description: "Subtracting positive and negative whole numbers"
  },
  {
    unit_id: 1,
    title: "Integer Multiplication",
    description: "Multiplying positive and negative whole numbers"
  },
  {
    unit_id: 1,
    title: "Integer Division",
    description: "Dividing positive and negative whole numbers"
  },
  {
    unit_id: 2,
    title: "Understanding Symbolism",
    description: "Recognize and interpret Symbolism."
  },
  {
    unit_id: 2,
    title: "Understanding Alliteration",
    description: "Recognize and interpret Alliteration."
  },
  {
    unit_id: 3,
    title: "Recognizing Like Terms",
    description: "Differentiating between Like and Unlike Terms"
  },
  {
    unit_id: 3,
    title: "Combining Like Terms",
    description: "Adding and Subtracting Like Terms"
  },
  {
    unit_id: 3,
    title: "Distributive Property",
    description: "Multiplying a Number over Addition and Subtraction"
  },
  {
    unit_id: 4,
    title: "Writing Good Dialogue",
    description: "Understanding how to write Dialogue that makes sense and flows well"
  },
  {
    unit_id: 4,
    title: "Setting the Mood",
    description: "Understanding how to describe the setting based on a chosen mood"
  },
]

skills_data.each do |skill|
  Skill.create!(skill)
end

grades_data = [
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 1,
    grade: 95
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 2,
    grade: 100
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 3,
    grade: 100
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 4,
    grade: 100
  },
  {
    student_id: 3,
    teacher_id: 1,
    skill_id: 1,
    grade: 100
  },
  {
    student_id: 3,
    teacher_id: 1,
    skill_id: 2,
    grade: 92
  },
  {
    student_id: 3,
    teacher_id: 1,
    skill_id: 3,
    grade: 85
  },
  {
    student_id: 3,
    teacher_id: 1,
    skill_id: 4,
    grade: 100
  },
  {
    student_id: 6,
    teacher_id: 5,
    skill_id: 5,
    grade: 85
  },
  {
    student_id: 6,
    teacher_id: 5,
    skill_id: 6,
    grade: 100
  },
  {
    student_id: 7,
    teacher_id: 5,
    skill_id: 5,
    grade: 80
  },
  {
    student_id: 7,
    teacher_id: 5,
    skill_id: 6,
    grade: 80
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 7,
    grade: 95
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 8,
    grade: 100
  },
  {
    student_id: 2,
    teacher_id: 1,
    skill_id: 9,
    grade: 100
  },
  {
    student_id: 3,
    teacher_id: 5,
    skill_id: 10,
    grade: 100
  },
  {
    student_id: 3,
    teacher_id: 5,
    skill_id: 11,
    grade: 92
  },
]

grades_data.each do |grade|
  Grade.create!(grade)
end

family_data = [
  {
    parent_id: 4,
    student_id: 2
  },
  {
    parent_id: 4,
    student_id: 3
  },
  {
    parent_id: 9,
    student_id: 6
  },
  {
    parent_id: 9,
    student_id: 7
  }
]

family_data.each do |family|
  Family.create!(family)
end