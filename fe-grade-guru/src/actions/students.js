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

  export const updateStudentSkillGrades = async (teacher_id, student_id, updatedGrades) => {
    const resp = await fetch(`/teachers/${teacher_id}/students/${student_id}/grades/update`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(updatedGrades)

    });

    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const errorData = await resp.json();
      console.log(errorData)
      return { errors: errorData.errors };
    }
  }

  export const getDataForStudent = async (id) => {
    const resp = await fetch(`/students/${id}`, {
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

  export const enrollStudents = async (teacherId, studentIds) => {
    const resp = await fetch(`/enroll-students`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        teacher_id: teacherId,
        student_ids: studentIds,
      }),
    });

    if (resp.ok) {
      const data = await resp.json();
      return data
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

  export const unenrollStudent = async (teacherId, studentId) => {
    const resp = await fetch(`/unenroll-students`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        teacher_id: teacherId,
        student_id: studentId,
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      return data
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };