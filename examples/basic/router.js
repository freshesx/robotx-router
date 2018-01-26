import Vue from 'vue'
import { FeRouter, FeRouterViews } from '../../dist/main.esm.js'
import Homepage from './components/Homepage.vue'

// 1. Define route components
const Foo = { template: '<div>products</div>' }
const Bar = { template: '<div>cases</div>' }

// 2. Create the router
const feRouter = new FeRouter([
  { name: 'homepage', component: Homepage },
  { name: 'products', component: Foo },
  { name: 'cases', component: Bar }
])

// 3. Use feRouter
Vue.use(feRouter)
Vue.use(FeRouterViews)

export default feRouter
