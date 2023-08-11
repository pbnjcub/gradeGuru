export const getUsers = async () => {
    const resp = await fetch('/users', {
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
}

export const editUser = async (id, updatedUser) => {
    const resp = await fetch(`/users/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify(updatedUser)
    });
    
    if (resp.ok) {
        const data = await resp.json();
        return data
    } else {
        const errorData = await resp.json();
        return { errors: errorData.errors };
    }
}