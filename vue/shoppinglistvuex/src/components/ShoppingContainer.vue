<template>
	<div>
		<router-link to="/">List</router-link>
		<br/>
		<router-link to="/form">Add</router-link>
		<router-view/>
	</div>
</template>
<script>
export default {
	name:"ShoppingContainer"
}
</script>