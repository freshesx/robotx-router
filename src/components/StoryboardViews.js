import FeRouterView from './StoryboardView'

export default {
  name: 'StoryboardViews',
  render (h) {
    const children = this.$storyboard.tasks.map(task => {
      const isActive = this.$storyboard.active &&
        this.$storyboard.active.uid === task.uid

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
