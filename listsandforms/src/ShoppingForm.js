import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			type:"",
			price:0,
			count:0
		}
	}
	//this.props.addToList(item)
	
	onChange = (event) => {
		let state={};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			"type":this.state.type,
			"price":this.state.price,
			"count":this.state.count
		}
		
		//let item = {...this.state};
		this.props.addToList(item);
	}
	
	render() {
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="type">Type</label>
					<input type="text"
						   name="type"
						   value={this.state.type}
						   onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="count">Count</label>
					<input type="number"
						   name="count"
						   value={this.state.count}
						   onChange={this.onChange}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="price">Price</label>
					<input type="number"
						   name="price"
						   value={this.state.price}
						   onChange={this.onChange}/>
				</Form.Field>
				<Button type="submit">Add</Button>
			</Form>
			
		)
	
	}
}

