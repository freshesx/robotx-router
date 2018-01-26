import Vue from 'vue'
import { RxRouter } from '../../dist/main.esm.js'

// 1. Define route components
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>products</div>' }
const Bar = { template: '<div>cases</div>' }

// 2. Create the router
const rxRouter = new RxRouter({
  components: [
    { name: 'homepage', component: Home },
    { name: 'products', component: Foo },
    { name: 'cases', component: Bar }
  ]
})

// 3. Use RxRouter
Vue.use(rxRouter)

// 4. Create and mount root instance.
new Vue({
  template: `
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
      <!--
      <div v-for="(collection, name) in collections">
        <h1>{{ name }}</h1>
        <ul>
          <li v-for="item in collection">
            {{ item }}
          </li>
        </ul>
      </div>
      -->
    </div>
  `,
  methods: {
    addTask () {
      rxRouter.addTask('homepage')
    },
    pushTask (name) {
      rxRouter.pushTask(name)
    },
    removeTask () {

    },
    updateRecord () {

    },
    prevRecord () {

    },
    nextRecord () {

    }
  }
}).$mount('#app')
