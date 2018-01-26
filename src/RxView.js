export default {
  name: 'RxView',
  props: {
    task: {
      type: Object
    }
  },
  render (h) {
    return h(
      this.task.record.component.component
    )
  }
}
