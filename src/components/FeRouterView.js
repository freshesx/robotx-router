export default {
  name: 'FeRouterView',
  props: {
    task: {
      type: Object
    }
  },
  render (h) {
    if (!this.task) return

    return h(
      this.task.record.page.component
    )
  },
  install (Vue) {
    Vue.component(this.name, this)
  }
}
