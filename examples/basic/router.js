import Vue from 'vue'
import { Storyboard, StoryboardViews } from '../../dist/main.esm.js'
import Homepage from './components/Homepage.vue'

// 1. Define route components
const Foo = { template: '<div>products</div>' }
const Bar = { template: '<div>cases</div>' }

// 2. Create the router
const storyboard = new Storyboard([
  { name: 'homepage', component: Homepage },
  { name: 'products', component: Foo },
  { name: 'cases', component: Bar }
])

// 3. Use Storyboard
Vue.use(storyboard)
Vue.use(StoryboardViews)

export default storyboard
