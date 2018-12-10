import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShoppingList from './ShoppingList';
import ShoppingForm from './ShoppingForm';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class Main extends React.Component {

	render() {
		return(
			<Switch>
				<Route exact path="/" render={() => 
					this.props.isLogged ?
					(<Redirect to="/list"/>):					
					(<LoginForm />)
				}/>			
				<Route path="/list" render={() => 
					this.props.isLogged ?					
					(<ShoppingList />) :
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() =>
					this.props.isLogged ?		
					(<ShoppingForm />) :
					(<Redirect to="/"/>)					
				}/>
			</Switch>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.login.isLogged
	}
}

export default withRouter(connect(mapStateToProps)(Main));