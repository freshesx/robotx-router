export default {
  name: 'StoryboardView',
  props: {
    task: {
      type: Object
    }
  },
  render (h) {
    if (!this.task) return

    return h(
      this.task.record.board.component
    )
  },
  install (Vue) {
    Vue.component(this.name, this)
  }
}
