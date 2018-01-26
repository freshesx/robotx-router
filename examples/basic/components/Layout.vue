<template>
  <div id="app">
    <div class="navbar">
      <button @click="pushTask('homepage')">Homepage</button>
      <button @click="pushTask('products')">products</button>
      <button @click="pushTask('cases')">cases</button>
    </div>
    <div class="tasks">
      <div
        class="task"
        :class="{ 'is-active': $rxCollection.activedTask && $rxCollection.activedTask.id === task.id }"
        v-for="task in $rxCollection.tasks" :key="task.id"
        @click="activeTask(task, $event)"
      >{{ task.id }}</div>
      <div class="task task-plus" @click="addTask">+</div>
    </div>
    <div class="views">
      <div
        class="view"
        :class="{ 'is-active': $rxCollection.activedTask && $rxCollection.activedTask.id === task.id }"
        v-for="task in $rxCollection.tasks" :key="task.id"
      >R{{ task.record.id }}</div>
    </div>
  </div>
</template>

<script>
import rxRouter from '../rxRouter.js'

export default {
  methods: {
    addTask () {
      rxRouter.addTask('homepage')
    },
    pushTask (name) {
      rxRouter.pushTask(name)
    },
    activeTask (task, event) {
      rxRouter.activeTask(task)
    }
  }
}
</script>
