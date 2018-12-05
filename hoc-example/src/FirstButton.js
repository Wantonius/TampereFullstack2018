import React from 'react'

export default class FirstButton extends React.Component {

	callback =(event) => {
		this.props.callback("This is the First Button");
	}

	render() {
		let buttonStyle = {backgroundColor:this.props.color}
		return (
			<button style={buttonStyle}
				onClick={this.callback}>Awesome!</button>
		)
	
	}
}