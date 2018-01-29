<template>
  <div>
    <h1>Homepage</h1>
    <div>Description</div>
    <div>Your name: {{ models.username }}</div>

    <form @submit="submit">
      <input type="text" v-model="models.username">
      <button type="submit">Confirm</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      models: {
        username: undefined
      }
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.$storyboard.update({
        query: this.models
      })
    }
  }
}
</script>
