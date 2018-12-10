import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {register,login} from './actions/loginActions';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	submit = (event) => {
		if(this.state.username.length === 0 || this.state.password.length ===0) {
			return
		}
		let user = {
			"username":this.state.username,
			"password":this.state.password
		}
		if(event.target.name === "register") {
			this.props.dispatch(register(user));
		} else {
			this.props.dispatch(login(user));
		}
	}
	
	onChange = (event) => {
		let state={};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	render() {
			return(
				<Form>
					<Form.Field>
						<label htmlFor="username">Username</label>
						<input type="text"
							   name="username"
							   value={this.state.username}
							   onChange={this.onChange}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password</label>
						<input type="password"
							   name="password"
							   value={this.state.password}
							   onChange={this.onChange}/>
					</Form.Field>
					<Button onClick={this.submit}
							name="login">Login</Button>
					<Button onClick={this.submit}
							name="register">Register</Button>
			</Form>
		)
	}
}

export default connect()(LoginForm);