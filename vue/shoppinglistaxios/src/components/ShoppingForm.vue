<template>
	<div>
		<label for="type">Enter item type:</label>
		<input name="type" type="text" v-model="item.type"/>
		<label for="count">How many items:</label>
		<input name="count" type="number" minimum="0" step="1" v-model="item.count"/>
		<label for="price">Price:</label>
		<input name="price" type="number" minimum="0" step="0.01"
		v-model="item.price"/>
		<br/>
		<button v-on:click="addToList()">Add</button>
	</div>
</template>
<script>
export default {
	name:"ShoppingForm",
	data:function() {
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
		addToList:function() {
			this.$store.dispatch("addToList",this.item);
			this.item= {
				id:0,
				type:"",
				count:0,
				price:0
			}
		}
	}
}
</script>