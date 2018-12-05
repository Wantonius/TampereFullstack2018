import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HocDecorator from './HocDecorator';
import FirstButton from './FirstButton';
import SecondButton from './SecondButton';

class App extends Component {
		
	constructor(props) {
		super(props);
		this.state= {
			message:""
		}
	}

	callback = (message) => {
		this.setState({
			message:message
		})
	}
	
  render() {
    return (
      <div className="App">
			<p>Button says:{this.state.message}</p>
			<MyButton callback={this.callback}/>
			<OtherButton callback={this.callback}/>
      </div>
    );
  }
}

const MyButton = HocDecorator(FirstButton);
const OtherButton = HocDecorator(SecondButton);

export default App;
