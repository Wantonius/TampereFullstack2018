<template>
	<div>
		<h1>Hello, {{$route.params.person}}</h1>
		<button v-on:click="goBack()">Back</button>
	</div>
</template>
<script>
export default {
	name:"Greet",
	methods: {
		goBack:function() {
			this.$router.go(-1);
		}
	}
}
</script>