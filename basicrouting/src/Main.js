import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ShoppingList from './ShoppingList';
import ShoppingForm from './ShoppingForm';
export default class Main extends React.Component {

	render() {
		return(
			<Switch>
				<Route exact path="/" render={() => 
					<ShoppingList list={this.props.list}
					removeFromList={this.props.removeFromList}/>
				}/>
				<Route path="/form" render={() =>
					<ShoppingForm addToList={this.props.addToList}/>
				}/>
			</Switch>
		)
	}
}