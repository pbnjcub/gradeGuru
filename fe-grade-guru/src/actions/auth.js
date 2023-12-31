
export const createAccount = async (details) => {
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
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };

  export const login = async (details, handleCurrentUser) => {
    const resp = await fetch('/login', {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(details)
    });
  
    if (resp.ok) {
      const data = await resp.json();
      handleCurrentUser(data);
      return data
      // handleNavigation(data.role, data.id);
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };


export const logout = async (logoutCurrentUser) => {
await fetch('/logout', {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

logoutCurrentUser();
};

export const getCurrentUser = async () => {
  try {
    const resp = await fetch('/current-user', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      mode: 'cors'
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching the current user:", error);
    return null;
  }
};



              