import React from 'react';

const HocDecorator = (WrappedComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				color:"red"
			}
		}
	
		onChange = (event) => {
			let state = {};
			state[event.target.name] = event.target.value;
			this.setState(state);
		}
		
		render() {
			return (
				<div>
					<WrappedComponent {...this.props}
					color={this.state.color}/>
					<input type="text"
						   name="color"
						   value={this.state.color}
						   onChange={this.onChange}/>
				</div>
			)
		}
		
	}
}

export default HocDecorator;