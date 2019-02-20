<template>
<div>
	<label for="username">Username:</label>
	<input type="text" name="username" v-model="user.username"/>
	<br/>
	<label for="password">Password:</label>
	<input type="password" name="password" v-model="user.password"/>
	<br/>	
	<button v-on:click="register()">Register</button>
	<button v-on:click="login()">Login</button>
</div>
</template>
<script>
export default {
	name:"LoginForm",
	data() {
		return {
			user:{
				username:"",
				password:""
			}
		}
	},
	methods: {
		login:function() {
			this.$store.dispatch("login",this.user);
		},
		register:function() {
			this.$store.dispatch("register",this.user);
		}
	}
}
</script>