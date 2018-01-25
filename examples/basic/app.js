import Vue from 'vue'
import { RxRouter } from '../../dist/main.esm.js'

// 1. Use RxRouter
Vue.use(RxRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>products</div>' }
const Bar = { template: '<div>cases</div>' }

// 3. Create the router
const rxRouter = new RxRouter({
  routes: [
    { name: 'homepage', component: Home },
    { name: 'products', component: Foo },
    { name: 'cases', component: Bar }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  rxRouter,
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
          v-for="task in $rxTasks" :key="task.id"
        >{{ task.id }}</div>
        <div class="task task-plus" @click="addTask">+</div>
      </div>
      <div class="views">
        <div
          class="view"
          v-for="task in $rxTasks" :key="task.id"
        >{{ task.id }}</div>
      </div>
      <div v-for="(collection, name) in collections">
        <h1>{{ name }}</h1>
        <ul>
          <li v-for="item in collection">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  `,
  computed: {
    collections () {
      return {
        components: this.$rxComponents,
        records: this.$rxRecords,
        tasks: this.$rxTasks
      }
    }
  },
  methods: {
    addTask () {
      this.$rxRouter.addTask('homepage')
    },
    pushTask (name) {
      this.$rxRouter.pushTask(name)
    },
    removeTask () {

    },
    updateRecord () {

    },
    prevRecord () {

    },
    nextRecord () {

    }
  },
  mounted () {
    this.$rxRouter.addTask('products')
  }
}).$mount('#app')
