import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import { AdminContext } from "../contexts/AdminContext";
import { createFamily } from '../actions/families'; // This action will call the backend to link a parent and students
import FamilyParentSearch from './FamilyParentSearch';
import FamilyStudentSearch from './FamilyStudentSearch';
import '../styling/TablesForms.css'

const FamilyCreation = () => {
  const { currentUser, setCurrentUser, loading: userLoading } = useContext(UserContext);
  const { allUsers, setAllUsers, loading: adminLoading } = useContext(AdminContext);
  
  // Local states
  const [searchStudent, setSearchStudent] = useState('');
  const [searchParent, setSearchParent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allParents, setAllParents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [familyCreated, setFamilyCreated] = useState(false);

  useEffect(() => {
    if (allUsers.length) {
      const students = allUsers.filter(user => user.role === 'student');
      const parents = allUsers.filter(user => user.role === 'parent');

      setAllStudents(students);
      setAllParents(parents);
    }
  }, [allUsers])

  console.log(allStudents)
  console.log(allParents)

  const handleUpdatedFamilies = (updatedFamily) => {
    console.log(updatedFamily)
    const updatedUsers = allUsers.map(user => {
      if (user.id === updatedFamily.parent.id) {
        return updatedFamily.parent;
      }
      
      const updatedStudent = updatedFamily.students.find(student => student.id === user.id);
      if (updatedStudent) {
        return updatedStudent;
      }
      return user;
    });
  
    setAllUsers(updatedUsers);
  }

  const confirmFamilyCreation = async () => {
    const studentIds = selectedStudents.map(student => student.id);
    const resp = await createFamily(selectedParent.id, studentIds);
    
    if (resp.errors) {
      setErrorMessages(resp.errors);
    } else {
      setErrorMessages([]);
      setSelectedStudents([]);
      setFilteredStudents([]);
      setSearchStudent('');
      handleUpdatedFamilies(resp);
      setFamilyCreated(true);
    }
  }

  const sortUsers = (unsorted) => {
    const sorted = unsorted.sort((a, b) => {
      const sortByLastName = a.last_name.localeCompare(b.last_name);
      if (sortByLastName !== 0) {
        return sortByLastName;
      } else {
        return a.first_name.localeCompare(b.first_name);
      }
    })
    return sorted;
  };
  
  const handleParentSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchParent(query);
    const filtered = allParents.filter((parent) => parent.last_name.toLowerCase().includes(query));
    setFilteredParents(sortUsers(filtered));
    setSearchParent(null)

    if (selectedParent) {
        setSelectedParent(null)
    }
  };
  
  const handleAddParentClick = (addedParent) => {
    const updatedFilteredParents = sortUsers(filteredParents.filter(parent => parent.id !== addedParent.id));
    setSelectedParent(addedParent);
    setFilteredParents(updatedFilteredParents);
  };
  
  const handleUnselectParentClick = (unselectedParent) => {
    if (!unselectedParent) return;
    const updatedFilteredParents = sortUsers([...filteredParents, unselectedParent]);
    setFilteredParents(updatedFilteredParents);
    setSelectedParent(null);
  };
  
  const handleStudentSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchStudent(query);
    const filtered = allStudents.filter((student) =>
      student.last_name.toLowerCase().includes(query) &&
      !selectedStudents.some(selected => selected.id === student.id)
    );
    setFilteredStudents(filtered);
};

  
  const handleAddStudentClick = (addedStudent) => {
    const updatedSelectedStudents = sortUsers([...selectedStudents, addedStudent]);
    const updatedFilteredStudents = sortUsers(filteredStudents.filter(student => student.id !== addedStudent.id));
    setSelectedStudents(updatedSelectedStudents);
    setFilteredStudents(updatedFilteredStudents);
  };
  
  const handleUnselectStudentClick = (unselectedStudent) => {
    const updatedFilteredStudents = sortUsers([...filteredStudents, unselectedStudent]);
    const updatedSelectedStudents = sortUsers(selectedStudents.filter(student => student.id !== unselectedStudent.id));
    setFilteredStudents(updatedFilteredStudents);
    setSelectedStudents(updatedSelectedStudents);
    // handleStudentSearch({ target: { value: searchStudent } });
  };

  console.log(filteredStudents)
  console.log(selectedStudents)
  

  if (userLoading || adminLoading) { 
    return <div>Loading...</div>;
  }
console.log(filteredStudents)
console.log(filteredParents)
console.log(selectedParent)
  return (
    <div className="container">
      <h1>Family Creation</h1>
      <h3>Welcome, {currentUser.first_name}</h3>
      <br />
      <p>
        Please use the tools below to create family links between students and a parent.
      </p>
      <br />
      { familyCreated ? (
        <h3>Family link was successfully created!</h3>
        ) : null
      }
      {/* Rendering search components similar to the Enrollments component. You might want to refactor them to make them reusable. */}
      <div className="flex-container">
      <FamilyStudentSearch
        handleStudentSearch={handleStudentSearch}
        handleAddStudentClick={handleAddStudentClick}
        handleUnselectStudentClick={handleUnselectStudentClick}
        searchStudent={searchStudent}
        filteredStudents={filteredStudents}
        selectedStudents={selectedStudents}
        selectedParent={selectedParent}
    />
    <FamilyParentSearch
        handleParentSearch={handleParentSearch}
        handleAddParentClick={handleAddParentClick}
        handleUnselectParentClick={handleUnselectParentClick}
        searchParent={searchParent}
        filteredParents={filteredParents}
        selectedParent={selectedParent}
    />
      </div>
      <br />
      {selectedStudents.length > 0 && selectedParent && (
        <button id="confirm-family-button" className="pure-button" onClick={() => confirmFamilyCreation()}>Confirm Family Link</button>
      )}
    </div>
  );
}

export default FamilyCreation;
