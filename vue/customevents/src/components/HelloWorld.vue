<template>
  <div class="hello">
	<CustomEvent @my-custom-event="eventHandler(...arguments)"/>
	<Receiver v-bind:message2="message"/>
  </div>
</template>

<script>
import Receiver from './Receiver';
import CustomEvent from './CustomEvent';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
	return {
		message:""
	}
  },
  components: {
	CustomEvent,
	Receiver
  },
  methods: {
	eventHandler:function(data) {
		this.message = data
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
