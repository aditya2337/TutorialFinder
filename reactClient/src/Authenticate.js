const Auth = {
  isAuthenticated: false,
  checkSession (callback) {
    fetch(`http://localhost:3001/users/home`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.authenticated) {
        this.isAuthenticated = true;
      }
    })
    .then(setTimeout(callback, 2000));
  },
  authenticate (username, password, callback) {
    fetch(`http://localhost:3001/users/login?username=${username.value}&password=${password.value}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
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
  },
  signup (email, password, fname, lname, callback) {
    fetch(`http://localhost:3001/users/signup?username=${email}&password=${password}&first_name=${fname}&last_name=${lname}`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (res.authenticated) {
        Auth.isAuthenticated = true;
      }
    })
    .then(callback);
  }
};

export default Auth;
