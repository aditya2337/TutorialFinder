const Auth = {
  isAuthenticated: false,
  isFetching: true,
  authenticate (username, password, callback) {
    fetch(`http://localhost:3001/users/login?username=${username}&password=${password}`, {
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
