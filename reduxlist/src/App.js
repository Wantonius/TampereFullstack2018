import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import Main from './Main';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
		<NavBar/>
		<hr/>
		<Main />
      </div>
    );
  }
}

export default withRouter(connect()(App));
