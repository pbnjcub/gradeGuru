export const getStudentsForTeacher = async (details, handleCurrentUser) => {
    console.log(details)  
    const resp = await fetch('/signup', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(details)
      });
    
      if (resp.ok) {
        const data = await resp.json();
        handleCurrentUser(data);
      } else {
        const errorData = await resp.json();
        return { errors: errorData.errors };
      }
    };