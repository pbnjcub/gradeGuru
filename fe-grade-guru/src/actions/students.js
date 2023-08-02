export const getGradesAndFeedbacksForStudent = async (student_id, unit_id) => {
    const resp = await fetch(`/students/${student_id}/units`, {
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

