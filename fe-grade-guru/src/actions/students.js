export const getGradesAndFeedbacksForStudent = async (teacher_id, student_id) => {
    console.log(student_id)
    const resp = await fetch(`/teachers/${teacher_id}/students/${student_id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (resp.ok) {
      const data = await resp.json();
      console.log(data)
      return data
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

//   export const getGradesAndFeedbacksForStudent = async (student_id, unit_id) => {
//     const resp = await fetch(`/students/${student_id}/units`, {
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       }
//     });

//     if (resp.ok) {
//       const data = await resp.json();
//       return data
//     } else {
//       const errorData = await resp.json();
//       return { errors: errorData.errors };
//     }
//   };