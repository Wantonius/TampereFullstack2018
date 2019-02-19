<template>
	<div>
		<label for="eventmessage">Type in a message:</label>
		<input name="eventmessage"
			   type="text" 
			   v-model="message"/>
		<button v-on:click="sendMessage()">Send</button>
	</div>
</template>
<script>
export default {
	name:"CustomEvent",
	data: function() {
		return {
			message:""
		}
	},
	methods: {
		sendMessage: function() {
			this.$emit("my-custom-event", this.message);
		}
	}
}

</script>