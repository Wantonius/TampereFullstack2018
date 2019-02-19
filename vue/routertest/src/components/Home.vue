<template>
	<div>
		<p>Please enter the person to greet</p>
		<input type="text" v-model="person"/>
		<button v-on:click="greet()">Greet</button>
	</div>
</template>
<script>
export default {
	name:"Home",
	data() {
		return {
			person:""
		}
	},
	methods: {
		greet: function() {
			let tempPerson = {"person":this.person}
			this.$router.push({name:"Greet", params:tempPerson})
		}
	}
}
</script>