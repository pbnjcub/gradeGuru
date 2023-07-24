const backendUrl = 'http://localhost:3000'

export const createAccount = async (details, handleCurrentUser) => {
    const resp = await fetch(`${backendUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(details),
      withCredentials: true
    });
  
    if (resp.ok) {
      const data = await resp.json();
      handleCurrentUser(data);
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };
  

  export const login = async (details, handleCurrentUser) => {
    const resp = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(details),
    });
  
    if (resp.ok) {
      const data = await resp.json();
      handleCurrentUser(data);
    } else {
      const errorData = await resp.json();
      return { errors: errorData.errors };
    }
  };


export const logout = async (logoutCurrentUser) => {
await fetch(`${backendUrl}/logout`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

logoutCurrentUser();
};


export const getCurrentUser = async (handleCurrentUser) => {
    const response = await fetch(`${backendUrl}/current-user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
    });

    const data = await response.json();
    handleCurrentUser(data);
  }   

              