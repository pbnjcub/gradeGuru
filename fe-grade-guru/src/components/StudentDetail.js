import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
// import { StudentsContext } from "../contexts/StudentsForTeacherContext"
import { useParams } from 'react-router-dom';
import UnitGradesAndFeedbacks from './UnitGradesAndFeedbacks';
import '../styling/TeacherView.css'
import jsPDF from 'jspdf';

const StudentDetail = ({ studentObj, setStudentObj, getStudentData, handleEditSkillsGrade }) => {

  const { teacher_id, student_id } = useParams();
  const { currentUser, loading } = useContext(UserContext);
  // const {students, loading: studentsLoading, selectedStudentDetails, setSelectedStudentDetails, setSelectedStudentId } = useContext(StudentsContext)

  const [isFetching, setIsFetching] = useState(true);
  const [errorMessages, setErrorMessages] = useState([])
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentStudentUnits, setCurrentStudentUnits] = useState([]);


  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        setIsFetching(true);
        setErrorMessages([]);

        const data = await getStudentData(currentUser.id, student_id);

        if (data) {
          setStudentObj(data);
          setCurrentStudent(data.student);
          setCurrentStudentUnits(data.units_with_skill_and_feedback);
        } else {
          setErrorMessages(['Failed to fetch student data.']);
        }
        setIsFetching(false);
      }
    }
    fetchData();
  }, [currentUser]);

//  useEffect(() => {
//     if(!userLoading) {
//       setSelectedStudentId(student_id); 
//     }
//   }, [currentUser, student_id]);
 
  // console.log(selectedStudentDetails)
  const unitList = currentStudentUnits.map(unit => (
    <UnitGradesAndFeedbacks key={unit.unit.id} unit={unit} studentObj={studentObj} handleEditSkillsGrade={handleEditSkillsGrade} />
  ));

  if (loading || isFetching) {
    return <p>Loading...</p>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    let yOffset = 10;
  
    doc.text(`Student Report for ${currentStudent.first_name} ${currentStudent.last_name}`, 10, yOffset);
    yOffset += 10;
  
    currentStudentUnits.forEach((unit, index) => {
      if (yOffset + 65 > doc.internal.pageSize.height) {
        doc.addPage();
        yOffset = 10;
      }

      doc.setLineWidth(1);
      doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`Unit: ${unit.unit.title}`, 10, yOffset);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Description: ${unit.unit.description}`, 10, yOffset + 10);
      doc.text(`Teacher: ${currentUser.first_name} ${currentUser.last_name}`, 10, yOffset + 20);
  
      yOffset += 30;
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Student Skills', 10, yOffset);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yOffset += 10;
  
      doc.text(`Written Work: ${unit.feedbacks[0]?.written_work}`, 10, yOffset);
      doc.text(`Classwork: ${unit.feedbacks[0]?.classwork}`, 70, yOffset);
      doc.text(`Homework: ${unit.feedbacks[0]?.homework}`, 130, yOffset);
      yOffset += 10;
     
      if (unit.skills.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Academic Skills', 10, yOffset);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        yOffset += 10;
  
        unit.skills.forEach((skill, skillIndex) => {
          doc.text(`${skillIndex + 1}. ${skill.skill.title}: ${skill.grade.grade || 'N/A'}`, 10, yOffset);
          yOffset += 10;
        });
      }

      doc.text(`Comment: ${unit.feedbacks[0]?.comment}`, 10, yOffset);

      yOffset += 10;
  
      if (index < currentStudentUnits.length - 1) {
        doc.line(10, yOffset, 200, yOffset); 
        yOffset += 10;
      }
    });
  
    doc.save(`StudentReport_${currentStudent.first_name}_${currentStudent.last_name}.pdf`);
  };

  return (
    <div className="main" style={{ marginLeft: '50px' }}>
      <h1>Student Report for {currentStudent.first_name} {currentStudent.last_name}</h1>
      <br />
      <button className="pure-button" onClick={generatePDF}>Generate PDF</button>
      <br />
      <h3>Grades and Feedback</h3>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th rowSpan="2" colSpan="2">Unit</th>
            <th colSpan="4">Feedbacks</th>
            <th rowSpan="2">Academic Skills</th>
            <th rowSpan="2">Actions</th>
          </tr>
          <tr>
            <td>Written Work</td>
            <td>Classwork</td>
            <td>Homework</td>
            <td>Comment</td>
          </tr>
        </thead>
        <tbody>
          {unitList}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default StudentDetail;
