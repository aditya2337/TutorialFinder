import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './components/Header';
injectTapEventPlugin();

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <Header />
      </MuiThemeProvider>
    );
  }
}

export default App;
