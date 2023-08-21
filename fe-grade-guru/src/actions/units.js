export const createUnit = async (teacher_id, details) => {
    console.log(details)  
    const resp = await fetch(`/teachers/${teacher_id}/units/create`, {
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
      } else {
        const errorData = await resp.json();
        return { errors: errorData.errors };
      }
    };

    export const getDataForUnit = async (teacher_id, unit_id) => {
        const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}`, {
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

      export const updateUnitSkill = async (teacher_id, unit_id, skillToUpdate) => {
        skill_id = parseInt(updatedSkill.id)

        const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/skills/${skill_id}/update`, {
          method: 'PATCH',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(skillToUpdate)
    
        });
    
        if (resp.ok) {
          const data = await resp.json();
          return data;
        } else {
          const errorData = await resp.json();
          return { errors: errorData.errors };
        }
      }