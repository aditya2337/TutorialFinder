import React, { Component } from 'react';

export default class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout (e) {
    e.preventDefault();
    fetch(`http://localhost:3001/users/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(blob => blob.json())
    .then(res => {
      if (!res.authenticated) {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }

  render () {
    return (
      <div>
        Welcome!
        <div>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
