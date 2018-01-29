<template>
  <div id="app">
    <div class="navbar">
      <button @click="pushTask('homepage')">Homepage</button>
      <button @click="pushTask('products')">products</button>
      <button @click="pushTask('cases')">cases</button>
      <button @click="serialize">serialize</button>
    </div>
    <div class="tasks">
      <div
        class="task"
        :class="{ 'is-active': $storyboard.active && $storyboard.active.uid === task.uid }"
        v-for="task in $storyboard.tasks" :key="task.uid"
        @click="activeTask(task, $event)"
      >{{ task.uid }}</div>
      <div class="task task-plus" @click="addTask">+</div>
    </div>
    <storyboard-views/>
  </div>
</template>

<script>
export default {
  methods: {
    addTask () {
      this.$storyboard.add('homepage')
    },
    pushTask (name) {
      this.$storyboard.push(name)
    },
    activeTask (task) {
      this.$storyboard.activate(task)
    },
    serialize () {
      console.log(this.$storyboard.serialize())
    }
  },
  created () {
    this.$storyboard.default('homepage')
  }
}
</script>
