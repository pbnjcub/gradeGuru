import React, { useState, useEffect } from 'react';
import userContext from './UserContext';
import '../styling/TablesForms.css'
import EnrollStudentSearch from './EnrollStudentSearch';
import EnrollTeacherSearch from './EnrollTeacherSearch';
import {enrollStudents} from '../actions/students';

const Enrollments = ({ users, handleUpdatedEnrollments }) => {
  const { currentUser } = React.useContext(userContext);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [errorMessages, setErrorMessages] = useState([])
  const [studentsEnrolled, setStudentsEnrolled] = useState(false)

  useEffect(() => {
    if (users) {
      const students = users.filter(user => user.role === 'student');
      const teachers = users.filter(user => user.role === 'teacher');

      setAllStudents(students);
      setAllTeachers(teachers);
    }
  }, [users])

  const showSuccessMessage = () => {
    setStudentsEnrolled(true)

    setTimeout(() => {
      setStudentsEnrolled(false)
    }, 5000)
  }

  const confirmEnrollmentClick = async () => {
    const studentIds = selectedStudents.map(student => student.id)
    const resp = await enrollStudents(selectedTeacher.id, studentIds);
    if (resp.errors) {
      setErrorMessages(resp.errors);
    } else {
      setErrorMessages([]);
      setSelectedStudents([])
      setFilteredStudents([])
      setSearchStudent('')
      handleUpdatedEnrollments(resp);
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
  };

  const handleAddTeacherClick = (addedTeacher) => {
    const updatedFilteredTeachers = sortUsers(filteredTeachers.filter(teacher => teacher.id !== addedTeacher.id))
    setSelectedTeacher(addedTeacher)
    setFilteredTeachers(updatedFilteredTeachers)

    enrolledStudentCheck(addedTeacher)
  }

  const enrolledStudentCheck = (addedTeacher) => {
    const studentsWithFeedback = []
    const notEnrolled = selectedStudents.filter((student) => {
      const hasFeedback = student.feedbacks.some((feedback) => feedback.teacher_id === addedTeacher.id);
      if (hasFeedback) {
        studentsWithFeedback.push(student);
      } else {
        return !hasFeedback;
      }
    })
    setFilteredStudents(sortUsers([...filteredStudents, ...studentsWithFeedback]));
    setSelectedStudents(notEnrolled);
  } 

  const handleUnselectTeacherClick = (unselectedTeacher) => {
    if (!unselectedTeacher) return;
    const updatedFilteredTeachers = sortUsers([...filteredTeachers, unselectedTeacher])
    setFilteredTeachers(updatedFilteredTeachers)
    setSelectedTeacher(null)
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchStudent(query);
    const filtered = allStudents.filter((student) => 
        student.last_name.toLowerCase().includes(query) &&
        !selectedStudents.some(selected => selected.id === student.id)
    );
    setFilteredStudents(filtered);
  };


  const handleAddClick = (addedStudent) => {  
    const updatedSelectedStudents = sortUsers([...selectedStudents, addedStudent]);
    const updatedFilteredStudents = sortUsers(filteredStudents.filter(student => student.id !== addedStudent.id));
    setSelectedStudents(updatedSelectedStudents);
    setFilteredStudents(updatedFilteredStudents);
  };
  
  const handleUnselectClick = (unselectedStudent) => {
    const updatedFilteredStudents = sortUsers([...filteredStudents, unselectedStudent])
    const updatedSelectedStudents = sortUsers(selectedStudents.filter(student => student.id !== unselectedStudent.id))
    setFilteredStudents(updatedFilteredStudents)
    setSelectedStudents(updatedSelectedStudents)
  }

  return (
    <div className="container">
      <h1>Enrollments</h1>
      <h3>Welcome, {currentUser.first_name}</h3>
      <br />
      <p>
        Please use the tools below to enroll a student or students to a teacher's class.
      </p>
      <br />
      { studentsEnrolled ? (
        <h3>Students were successfully enrolled!</h3>
        ) : null
      }
      <div className="flex-container">
        <EnrollStudentSearch
          allStudents={allStudents}
          handleSearch={handleSearch}
          handleAddClick={handleAddClick}
          handleUnselectClick={handleUnselectClick}
          searchStudent={searchStudent}
          filteredStudents={filteredStudents}
          selectedStudents={selectedStudents}
          selectedTeacher={selectedTeacher}
        />
        <EnrollTeacherSearch
          allTeachers={allTeachers}
          handleTeacherSearch={handleTeacherSearch}
          handleAddTeacherClick={handleAddTeacherClick}
          handleUnselectTeacherClick={handleUnselectTeacherClick}
          searchTeacher={searchTeacher}
          filteredTeachers={filteredTeachers}
          selectedTeacher={selectedTeacher}
        />
      </div>
      <br />
      {selectedStudents.length > 0 && selectedTeacher && (
        <button id="confirm-enrollment-button" className="pure-button-primary" onClick={() => confirmEnrollmentClick()}>Confirm Enrollment</button>
      )}
    </div>
  );
}

export default Enrollments;
