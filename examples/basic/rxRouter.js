import Vue from 'vue'
import { RxRouter, RxViews, RxView } from '../../dist/main.esm.js'

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
Vue.use(RxViews)
Vue.use(RxView)

export default rxRouter
