import React from 'react';

export default class StatefulComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			color:"red"
		}
	}

	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	
	render() {
		let style = {
			backgroundColor:this.state.color
			}
		return (
			<div>
				<h1 style={style}>This color changes!</h1>
				<input type="text"
					   name="color"
					   value={this.state.color}
					   onChange={this.onChange}/>
			</div>
		)
	}
}