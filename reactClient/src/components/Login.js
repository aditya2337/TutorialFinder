import React, { Component } from 'react';
import Authenticate from '../Authenticate';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.login = this.login.bind(this);
  }

  login (e) {
    e.preventDefault();
    let { username, password } = this.refs;
    username = username.getValue();
    password = password.getValue();
    Authenticate.authenticate(username, password, () => {
      this.setState({ isLoggedIn: true });
    });
  }

  render () {
    const { isLoggedIn } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    if (isLoggedIn) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className='container-fluid'>
        <form onSubmit={this.login}>
          <div>
            <label>Email:</label>
            <TextField
              hintText='abc@abc.com'
              floatingLabelText='Email'
              ref='username'
            />
          </div>
          <div>
            <label>Password:</label>
            <TextField
              hintText='*****'
              floatingLabelText='Password'
              ref='password'
              type='password'
            />
          </div>
          <div>
            <button>Log In</button>
          </div>
        </form>
      </div>
    );
  }
}
