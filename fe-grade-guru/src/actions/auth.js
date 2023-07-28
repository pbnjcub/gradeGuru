
export const createAccount = async (details, handleCurrentUser) => {
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

  export const login = async (details, handleCurrentUser, handleNavigation) => {
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
      handleNavigation(data.role);
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


export const getCurrentUser = async (handleCurrentUser) => {
  const resp = await fetch('/current-user', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: 'include',
    mode: 'cors'
  });

  const data = await resp.json();
  console.log(data);
  handleCurrentUser(data);
};


              