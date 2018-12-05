import React from 'react'
import {Link} from 'react-router-dom'
import {List} from 'semantic-ui-react'

export default class NavBar extends React.Component {
	
	render(){
		return(
			<List>
				<List.Item><Link to="/">List</Link></List.Item>
				<List.Item><Link to="/form">Add Item</Link></List.Item>
			</List>			
		)
	}

}