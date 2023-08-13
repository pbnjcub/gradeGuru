export const getGradesAndFeedbacksForStudent = async (teacher_id, student_id) => {
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
      return data
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

  export const updateStudentFeedbacks = async (teacher_id, student_id, updatedFeedbacks) => {
    const id = updatedFeedbacks.id;
    const requestBody = {
      written_work: updatedFeedbacks.written_work,
      classwork: updatedFeedbacks.classwork,
      homework: updatedFeedbacks.homework,
      comment: updatedFeedbacks.comment,
    }
    const resp = await fetch(`/teachers/${teacher_id}/students/${student_id}/feedbacks/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)

    });
  
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

  export const updateStudentFeedbackSkills = async (teacher_id, student_id, feedback_id, updatedSkills) => {
    const id = updatedSkills.id;

    const resp = await fetch(`/teachers/${teacher_id}/students/${student_id}/feedbacks/${feedback_id}/skills/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(updatedSkills)

    });

    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

  
