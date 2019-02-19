<template>
	<div>
		<hr/>
		<table v-if="list.length">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Buy</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in list" :key="i.id">
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
	props: ['list'],
	data: function() {
		return {
			item: {
				id:0,
				type:"",
				count:0,
				price:0
			}
		}
	},
	methods: {
		removeFromList:function(index) {
			this.$emit('remove-item',index);
		}
	}
}
</script>