import RxView from './RxView'

export default {
  name: 'RxViews',
  render (h) {
    const children = this.$feRoute.tasks.map(task => {
      const isActive = this.$feRoute.active &&
        this.$feRoute.active.uid === task.uid

      return h(
        RxView,
        {
          props: {
            task: task
          },
          class: {
            'rx-view': true
          },
          style: {
            display: isActive ? 'block' : 'none'
          }
        }
      )
    })

    return h(
      'div',
      {
        class: {
          'rx-views': true
        }
      },
      children
    )
  },
  install (Vue) {
    Vue.component(this.name, this)
  }
}
