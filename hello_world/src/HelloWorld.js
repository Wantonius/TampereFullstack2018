import React from 'react';

export default class HelloWorld extends React.Component {


	render()  {
		console.log(this.props);
		let name = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return (
			<div>	
				<h1>Hello {name}</h1>
			</div>
		)
	}
}