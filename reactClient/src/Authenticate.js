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
    fetch(`http://localhost:3001/users/signup`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: email,
        password: password,
        fname: fname,
        lname: lname
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(callback);
  }
};

export default Auth;
