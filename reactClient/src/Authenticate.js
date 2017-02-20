const Auth = {
  isAuthenticated: false,
  authenticate (username, password, callback) {
    fetch(`http://localhost:3001/users/login?username=${username.value}&password=${password.value}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.authenticated) {
        this.isAuthenticated = true;
      }
    })
    .then(callback);
  },
  signout (callback) {
    fetch(`http://localhost:3001/users/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (!res.authenticated) {
        Auth.isAuthenticated = false;
      }
    }).then(callback);
  }
};

export default Auth;
