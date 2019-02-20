<template>
	<div v-if="this.$store.state.isLogged">
		<router-link to="/">List</router-link>
		<br/>
		<router-link to="/form">Add</router-link>
		<router-view/>
	</div>
	<div v-else>
		<LoginForm/>
	</div>
</template>
<script>
import LoginForm from './LoginForm';
export default {
	name:"ShoppingContainer",
	components: {
		LoginForm
	}
}
</script>