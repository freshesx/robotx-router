export default function (Vue, options) {
  Vue.mixin({
    beforeCreate () {
      if (!this.$options.rxRouter) {
        throw new Error('The rxRouter is not define.')
      }

      this._rxRouterRoot = this
      this._rxRouter = this.$options.rxRouter
      this._rxRouter.bind(this) // bind vm into rxRouter

      Vue.util.defineReactive(this, '_rxCollection', this._rxRouter.collection)
    }
  })

  Object.defineProperty(Vue.prototype, '$rxRouter', {
    get () {
      return this._rxRouterRoot._rxRouter
    }
  })

  Object.defineProperty(Vue.prototype, '$rxCollection', {
    get () {
      return this._rxRouterRoot._rxCollection
    }
  })
}
