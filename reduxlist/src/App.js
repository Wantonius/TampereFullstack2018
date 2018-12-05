import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import Main from './Main';

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

export default App;
