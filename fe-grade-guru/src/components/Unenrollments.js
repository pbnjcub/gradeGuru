import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import '../styling/TablesForms.css'
import UnenrollTeacherSearch from './UnenrollTeacherSearch';
import StudentEnrollmentList from './StudentEnrollmentList';
import {unenrollStudent} from '../actions/students';

const Unenrollments = ({ users, handleUpdatedUnenrollments }) => {
  const { currentUser, loading } = useContext(UserContext);
  const [searchTeacher, setSearchTeacher] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [errorMessages, setErrorMessages] = useState([])
  const [studentsUnenrolled, setStudentsUnenrolled] = useState(false)

  useEffect(() => {
    if (users) {
      const students = users.filter(user => user.role === 'student');
      const teachers = users.filter(user => user.role === 'teacher');

      setAllStudents(students);
      setAllTeachers(teachers);
    }
  }, [users])

  const showSuccessMessage = () => {
    setStudentsUnenrolled(true)

    setTimeout(() => {
      setStudentsUnenrolled(false)
    }, 5000)
  }

  const handleUnenroll = (unenrolledStudent) => {
    const updatedFilteredStudents = filteredStudents.filter(student => student.id !== unenrolledStudent.id)
    setFilteredStudents(updatedFilteredStudents)    
  }

  const confirmUnenrollmentClick = async (studentToUnenroll) => {
    const resp = await unenrollStudent(selectedTeacher.id, studentToUnenroll.id);
    if (resp.errors) {
      setErrorMessages(resp.errors);
    } else {
      setErrorMessages([]);
      handleUnenroll(resp)
      handleUpdatedUnenrollments(resp);
      showSuccessMessage()
    }
  }

  const sortUsers = (users) => {
    const sorted = users.sort((a,b) => {
      const sortByLastName = a.last_name.localeCompare(b.last_name);
      if (sortByLastName !== 0) {
        return sortByLastName;
      } else {
        return a.first_name.localeCompare(b.first_name);
      }
    })
    return sorted
} 

  const handleTeacherSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTeacher(query);
    const filtered = allTeachers.filter((teacher) => teacher.last_name.toLowerCase().includes(query));
    setFilteredTeachers(sortUsers(filtered));
    setFilteredStudents([]);
  };

  const handleSelectTeacherClick = (addedTeacher) => {
    setSelectedTeacher(addedTeacher)

    const enrolledStudents = allStudents.filter(student =>
      student.feedbacks.some(feedback => feedback.teacher_id === addedTeacher.id))
    setFilteredStudents(sortUsers(enrolledStudents))
    setSearchTeacher('')
    }

  const filteredStudentList = filteredStudents.map((student) => <StudentEnrollmentList key={student.id} student={student} confirmUnenrollmentClick={confirmUnenrollmentClick}/>);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Unenroll Students</h1>
      <h3>Welcome, {currentUser.first_name}</h3>
      <br />
      <p>
        Please use the tools below to unenroll a student or students to a teacher's class.
      </p>
      <div className="flex-container">
        
        <UnenrollTeacherSearch
          handleTeacherSearch={handleTeacherSearch}
          handleSelectTeacherClick={handleSelectTeacherClick}
          searchTeacher={searchTeacher}
          filteredTeachers={filteredTeachers}
          selectedTeacher={selectedTeacher}
        />
      </div>
      <br />
      <div className="table-container">
      <h3>Enrolled Students for:    
        {selectedTeacher ? `   ${selectedTeacher.first_name} ${selectedTeacher.last_name}` : ""}
      </h3>
        { studentsUnenrolled ? (
            <h3>Students were unenrolled!</h3>
            ) : null
        }
      <table className="results-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudentList}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Unenrollments;
