<template>
	<div>
		<hr/>
		<table v-if="this.$store.state.shoppingList.length">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Buy</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in this.$store.state.shoppingList" :key="i.id">
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
	methods: {
		removeFromList:function(index) {
			this.$store.dispatch('removeFromList',index);
		}
	}
}
</script>