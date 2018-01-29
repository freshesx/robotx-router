import FeRouterView from './FeRouterView'

export default {
  name: 'FeRouterViews',
  render (h) {
    const children = this.$feRouter.tasks.map(task => {
      const isActive = this.$feRouter.active &&
        this.$feRouter.active.uid === task.uid

      return h(
        FeRouterView,
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
