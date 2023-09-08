export const createFamily = async (parentId, studentIds) => {
    const resp = await fetch('/create-family', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            parent_id: parentId,
            student_ids: studentIds,
        })
      });
    
      if (resp.ok) {
        const data = await resp.json();
        return data
      } else {
        const errorData = await resp.json();
        return { errors: errorData.errors };
      }
    };