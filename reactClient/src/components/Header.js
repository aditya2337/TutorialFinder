import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false
    };
    this._toggle = this._toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  _toggle (e) {
    e.preventDefault();
    this.setState({open: !this.state.open});
  }

  handleClose (e) {
    e.preventDefault();
    this.setState({open: false});
  }

  render () {
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this._toggle} title='Turorial finder' />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Link to='/login'><MenuItem onTouchTap={this.handleClose}>Log In</MenuItem></Link>
          <Link to='/login'><MenuItem onTouchTap={this.handleClose}>Register</MenuItem></Link>
          <a href='http://localhost:3001/users/auth/twitter'><MenuItem>Log In/Sign Up with twitter</MenuItem></a>
        </Drawer>
      </div>
    );
  }
}
