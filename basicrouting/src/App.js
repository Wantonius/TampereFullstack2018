import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import Main from './Main';

class App extends Component {
	constructor(props) {
		super(props);
		this.state= {
			list:[],
			id:100
		}
	}
	
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = sessionStorage.getItem("state");
			let jsonState = JSON.parse(state)
			this.setState(jsonState);
		}
	}
	
	addToList = (item) => {
		item.id = this.state.id;
		let tempList = [];
		let tempId = this.state.id+1;
		for(let i=0;i<this.state.list.length;i++) {
			tempList.push(this.state.list[i])			
		}
		tempList.push(item);
		this.setState({
			list:tempList,
			id:tempId
		})
		sessionStorage.setItem("state",JSON.stringify(
		{
			list:tempList,
			id:tempId
		}
		));

	}
	
	removeFromList = (id) => {
		let tempId = parseInt(id,10);
		let tempList = [];
		for(let i=0;i<this.state.list.length;i++) {
			if(this.state.list[i].id !== tempId) {
				tempList.push(this.state.list[i]);
			}
		}
		this.setState({
			list:tempList
		})
		sessionStorage.setItem("state",JSON.stringify({
			list:tempList
		}));
	}
	
  render() {
    return (
      <div className="App">
		<NavBar/>
		<hr/>
		<Main addToList={this.addToList}
		list={this.state.list}
		removeFromList={this.removeFromList}/>
      </div>
    );
  }
}

export default App;
