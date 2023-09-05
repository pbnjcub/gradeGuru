export const createUnit = async (teacher_id, details) => {
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
        return data
      } else {
        const errorData = await resp.json();
        return { errors: errorData.errors };
      }
    };

    export const updateUnit = async (teacher_id, unit_id, updatedUnit) => {
        const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/update`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(updatedUnit)
        });
        
          if (resp.ok) {
            const data = await resp.json();
            return data
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

      export const updateUnitSkill = async (teacher_id, unit_id, skill_id, updatingSkill) => {
        const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/skills/${skill_id}/update`, {
          method: 'PATCH',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(updatingSkill)
    
        });
    
        if (resp.ok) {
          const data = await resp.json();
          return data;
        } else {
          const errorData = await resp.json();
          return { errors: errorData.errors };
        }
      }

      export const createUnitSkill = async (teacher_id, unit_id, newUnitSkill) => {

        const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/skills/create`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(newUnitSkill)
          });
        
          if (resp.ok) {
            const data = await resp.json();
            return data
          } else {
            const errorData = await resp.json();
            return { errors: errorData.errors };
          }
        };

        export const deleteUnit = async (teacher_id, unit_id) => {
            const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/delete`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
            });
        };

        export const deleteUnitSkill = async (teacher_id, unit_id, skill_id) => {
          const resp = await fetch(`/teachers/${teacher_id}/units/${unit_id}/skills/${skill_id}/delete`, {
              method: 'DELETE',
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
          });
      };