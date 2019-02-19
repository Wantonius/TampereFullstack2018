<template>
	<div>

		<hr/>
		<table v-if="shoppingList.length">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Buy</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in shoppingList" :key="i.id">
					<td>{{i.type}}</td>
					<td>{{i.count}}</td>
					<td>{{i.price}}</td>
					<td><button v-on:click="removeFromList(index)">Buy</button></td>
				</tr>
			</tbody>
		</table>
		<p v-else>Nothing on list</p>
	</div>
</template>

<script>
export default {
	name:"ShoppingList",
	data: function() {
		return {
			shoppingList:[],
			id:100,
			item: {
				id:0,
				type:"",
				count:0,
				price:0
			}
		}
	},
	methods: {
		addToList: function() {
			this.item.id = this.id;
			this.id++;
			this.shoppingList.push(this.item);
			this.item = {
				id:0,
				type:"",
				count:0,
				price:0
			}
		},
		removeFromList: function(index) {
			this.shoppingList.splice(index,1);
		}
	}

}
</script>