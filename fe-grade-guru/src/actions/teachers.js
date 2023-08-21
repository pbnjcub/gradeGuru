export const getStudentsForTeacher = async (id) => {
    const resp = await fetch(`/teachers/${id}`, {
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


  export const getUnitsForTeacher = async (id) => {
    const resp = await fetch(`/teachers/${id}/units`, {
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

