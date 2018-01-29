import Storyboard from './Storyboard'

export default class VueStoryboard extends Storyboard {
  constructor (...args) {
    super(...args)
    this.vueReactiveName = 'storyboard'
    this.vms = []
    this.initStorage()
  }

  install (Vue) {
    const storyboard = this

    Vue.mixin({
      beforeCreate () {
        storyboard.bind(this)
        Vue.util.defineReactive(this, `_${this.vueReactiveName}`, storyboard)
      }
    })

    Object.defineProperty(Vue.prototype, `$${this.vueReactiveName}`, {
      get () {
        return storyboard
      }
    })

    return storyboard
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
      vm[`_${this.vueReactiveName}`] = this
    })
    // Save to session storage
    if (window.sessionStorage) {
      const str = JSON.stringify(this.serialize())
      window.sessionStorage.setItem(`FRESH_${this.vueReactiveName.toUpperCase()}`, str)
    }
    return this
  }

  initStorage () {
    if (!window.sessionStorage) return

    const str = window.sessionStorage.getItem(`FRESH_${this.vueReactiveName.toUpperCase()}`)

    if (!str) return

    try {
      this.parse(JSON.parse(str))
    } catch (err) {
      console.log('Cannot parse sessionStorage item.')
    }
  }
}
