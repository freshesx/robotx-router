import Vue from 'vue'
import { RxRouter, RxViews } from '../../dist/main.esm.js'
import Homepage from './components/Homepage.vue'

// 1. Define route components
const Foo = { template: '<div>products</div>' }
const Bar = { template: '<div>cases</div>' }

// 2. Create the router
const rxRouter = new RxRouter({
  components: [
    { name: 'homepage', component: Homepage },
    { name: 'products', component: Foo },
    { name: 'cases', component: Bar }
  ]
})

// 3. Use RxRouter
Vue.use(rxRouter)
Vue.use(RxViews)

export default rxRouter
