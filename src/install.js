export default function (Vue, options) {
  Vue.mixin({
    beforeCreate () {
      const router = this.$options.rxRouter

      Vue.util.defineReactive(this, '$rxRecords', router.records)
      Vue.util.defineReactive(this, '$rxTasks', router.tasks)
      Vue.util.defineReactive(this, '$rxComponents', router.components)
    },
    created () {
      console.log('created', this)
    }
  })

  Object.defineProperty(Vue.prototype, '$rxRouter', {
    get () {
      return this.$options.rxRouter
    }
  })
}
