<template>
	<div>
		<ShoppingForm @add-to-list="addToList(...arguments)"/>
		<ShoppingList v-bind:list="shoppingList" @remove-item="removeFromList(...arguments)"
		@edit-item="editItem(...arguments)"/>
	</div>
</template>
<script>
import ShoppingList from './ShoppingList';
import ShoppingForm from './ShoppingForm';
export default {
	name:"ShoppingContainer",
	components: {
		ShoppingForm,
		ShoppingList
	},
	data: function() {
		return {
			shoppingList:[],
			id:100
		}
	},
	methods: {
		addToList: function(item) {
			item.id = this.id;
			this.id++;
			this.shoppingList.push(item);
		},
		removeFromList: function(index) {
			this.shoppingList.splice(index,1);
		}
	}
}
</script>