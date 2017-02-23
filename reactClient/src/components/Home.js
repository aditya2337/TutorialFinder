import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      console.log('h');
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
      <div className='container'>
        <div className='center'>
          Welcome!
          <div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}
