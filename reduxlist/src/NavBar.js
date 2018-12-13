import React from 'react'
import {Link} from 'react-router-dom'
import {List} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {logout} from './actions/loginActions'

class NavBar extends React.Component {
	
	
	logout = () => {
		this.props.dispatch(logout(this.props.token));
	}
	render(){
		if(this.props.loading) {
			return (
				<div style={{height:65}}>
					<p>LOADING...</p>
				</div>
			)
		}
		if(this.props.error.length > 0) {
			return (
				<div style={{height:65}}>
					<p>Error: {this.props.error}</p>
				</div>
			)
		}
		if(this.props.isLogged) {
			return(
				<List>
					<List.Item><Link to="/list">List</Link></List.Item>
					<List.Item><Link to="/form">Add Item</Link></List.Item>
					<List.Item><Link to="/"
					onClick={this.logout}>Logout</Link></List.Item>
				</List>			
			)			
		} else {
			return (
				<div style={{height:65}}>
				</div>
			)
		}			
	}
}

const mapStateToProps = (state) => {
	let loading=false;
	let error="";
	if(state.shopping.loading || state.login.loading) {
		loading = true;
	}
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error;
	}
	return {
		isLogged: state.login.isLogged,
		loading:loading,
		token:state.login.token,
		error:error
	}
}

export default connect(mapStateToProps)(NavBar);