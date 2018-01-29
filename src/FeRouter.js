import Router from './Router'

export default class FeRouter extends Router {
  constructor (...args) {
    super(...args)
    this.vms = []
    this.initStorage()
  }

  get route () {
    return {
      tasks: this.tasks,
      active: this.active
    }
  }

  install (Vue) {
    const router = this

    Vue.mixin({
      beforeCreate () {
        router.bind(this)
        Vue.util.defineReactive(this, '_feRouter', router)
      }
    })

    Object.defineProperty(Vue.prototype, '$feRouter', {
      get () {
        return router
      }
    })

    return router
  }

  /**
   * Manually set self to bind vue component instance
   * @param {vueComponent} vm
   */
  bind (vm) {
    this.vms.push(vm)
    return this
  }

  /**
   * Manually notify that collection is updated.
   */
  notify (...args) {
    super.notify(...args)
    // notify vue to update reactive data
    this.vms.forEach(vm => {
      vm._feRouter = this
    })
    // Save to session storage
    if (window.sessionStorage) {
      const str = JSON.stringify(this.serialize())
      window.sessionStorage.setItem('FE_ROUTER', str)
    }
    return this
  }

  initStorage () {
    if (!window.sessionStorage) return

    const str = window.sessionStorage.getItem('FE_ROUTER')

    if (!str) return

    try {
      this.parse(JSON.parse(str))
    } catch (err) {
      console.log('Cannot parse sessionStorage item.')
    }
  }
}
