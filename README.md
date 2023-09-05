#README

### GradeGuru Web App
GradeGuru is a web application designed to facilitate the management and interaction between administrators, teachers, students, and parents within an educational environment. The app is built using the React framework and Ruby on Rails on the backend, and leverages various components and routes to provide a seamless user experience.

### Features
User Authentication: The app supports user authentication through sign-up and login functionalities, allowing users to create accounts, log in, and log out.

Role-Based Dashboards: Depending on the user's role (admin, teacher, student, or parent), the app provides tailored dashboards for each role to access relevant information and perform specific actions.

User Management: Admin users have access to the admin dashboard, where they can manage user accounts, view and edit user details, and keep track of users within the system.

Teacher Dashboard: Teachers can view their assigned units, students, and provide feedback on student performance. They can also create, update, and manage units, and access student details.

Student Dashboard: Students have access to their own dashboard, where they can view their units, grades, and feedback. They can also interact with the feedback forms provided by teachers.

Parent Dashboard: Parents can access their children's information, view their performance, and keep track of feedback provided by teachers.

Report Creation: Teachers, Students and Parents can download a PDF detailing how each student is performing in each academic class.

### Components
The app is composed of several key components:

UserContext: A context component to manage the current user's state and provide authentication data throughout the app.

NavBar: A navigation bar component displayed at the top of the app, providing links to different sections and actions based on user roles.

Home, Signup, Login, Logout: Components responsible for displaying the home page, user registration, user login, and user logout interfaces respectively.

AdminDashboard: An interface where admin users can manage user accounts and view the list of users.

TeacherDashboard: The dashboard for teachers, allowing them to manage units, students, and feedback.

StudentDashboard: A dashboard tailored for students, displaying their units, grades, and feedback.

ParentDashboard: The dashboard for parents to access their children's data and feedback.

UnitDetails, CreateUnitForm, UpdateUnitForm: Components for managing unit details, creating new units, and updating existing units.

StudentDetail: Displays detailed information about a specific student, including their grades and feedback.

FeedbackForm: Provides a form for teachers to input feedback on student performance.

UserEditForm: A form for editing user details, accessible from the admin dashboard.

Data Management
User data is managed using state variables like currentUser and loggedIn, ensuring the appropriate user context is maintained.

Student and unit data are fetched using API calls like getStudentData and getUnitData. Errors are handled gracefully to maintain a smooth user experience.

User-specific data, such as grades, feedback, and skills, are managed and updated through various handler functions like handleEditFeedback and handleEditSkillsGrade.

### Technologies used
React

Ruby on Rails

HTML and CSS

JavaScript

Model, View, Controller, Rails Generators, RESTful Routing, Full CRUD capabilities, Multiple Many-to-Many relationship, User Authorization, CanCanCan (Role-Handling), jsPDF (PDF Creation)

### Credits
jsPDF:
https://www.codexworld.com/convert-html-to-pdf-using-javascript-jspdf/

Rails Generators:
https://gist.github.com/cdesch/2f8de645cad1d83aa251c0a20b0f7097

Ruby on Rails:
https://guides.rubyonrails.org/

CanCanCan:
https://github.com/CanCanCommunity/cancancan

React:
https://legacy.reactjs.org/
https://www.w3schools.com/REACT/DEFAULT.ASP

### Getting Started
Clone the repository.

Install the necessary dependencies using npm install.

Run the app using npm start.

Access the app through your web browser at http://localhost:3000.

### Contributing
Contributions to GradeGuru are welcome! If you find any issues or want to add new features, feel free to submit pull requests.