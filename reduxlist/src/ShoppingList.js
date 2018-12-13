import React from 'react';
import {Table,Button} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {getList, deleteFromList} from './actions/shoppingActions';

class ShoppingList extends React.Component {

	componentDidMount() {
		this.props.dispatch(getList(this.props.token));
	}

	remove = (event) => {
		this.props.dispatch(deleteFromList(this.props.token,event.target.name));
	}

	render() {
		let items = this.props.list.map((item) => 
			<Table.Row key={item._id}>
				<Table.Cell>{item.type}</Table.Cell>
				<Table.Cell>{item.price}</Table.Cell>
				<Table.Cell>{item.count}</Table.Cell>
				<Table.Cell><Button name={item._id}
							onClick={this.remove}>Remove</Button>
							</Table.Cell>
			</Table.Row>
		)
		return (
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{items}
				</Table.Body>
			</Table>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		list:state.shopping.list,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(ShoppingList);