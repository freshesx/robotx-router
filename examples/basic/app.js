import Vue from 'vue'
import { RxRouter } from '../../dist/main.esm.js'

// 1. Use RxRouter
Vue.use(RxRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 3. Create the router
const rxRouter = new RxRouter({
  routes: [
    { name: 'products', component: Home },
    { name: 'caes', component: Foo },
    { name: 'users', component: Bar }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  rxRouter,
  template: `
    <div id="app">
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
  mounted () {
    this.$rxRouter.addTask('products')
  }
}).$mount('#app')
