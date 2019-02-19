<template>
  <div class="hello">
    <h1>Hello, {{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyFirstComponent',
  props: {
    name: String
  }
}
</script>