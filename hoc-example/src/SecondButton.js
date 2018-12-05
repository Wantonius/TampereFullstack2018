import React from 'react'

export default class SecondButton extends React.Component {

	callback =(event) => {
		this.props.callback("Second Button calling!");
	}

	render() {
		let buttonStyle = {backgroundColor:this.props.color}
		return (
			<button style={buttonStyle}
				onClick={this.callback}>Not so Awesome!</button>
		)
	
	}
}