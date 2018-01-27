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
        :class="{ 'is-active': $feRoute.active && $feRoute.active.uid === task.uid }"
        v-for="task in $feRoute.tasks" :key="task.uid"
        @click="activeTask(task, $event)"
      >{{ task.uid }}</div>
      <div class="task task-plus" @click="addTask">+</div>
    </div>
    <fe-router-views/>
  </div>
</template>

<script>
export default {
  methods: {
    addTask () {
      this.$feRouter.add('homepage')
    },
    pushTask (name) {
      this.$feRouter.push(name)
    },
    activeTask (task) {
      this.$feRouter.activate(task)
    },
    serialize () {
      console.log(this.$feRouter.serialize())
    }
  },
  created () {
    this.addTask()
  }
}
</script>
