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
        <div>
          <AppBar onLeftIconButtonTouchTap={this._toggle} title='Turorial finder' />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/login' />}>Log In</MenuItem>
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/register' />}>Register</MenuItem>
            <MenuItem containerElement={<Link to='http://localhost:3001/users/auth/twitter' />}>Log In/Sign Up with twitter</MenuItem>
          </Drawer>
        </div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
