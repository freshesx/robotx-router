import RxView from './RxView'

export default {
  name: 'RxViews',
  render (h) {
    const children = this.$rxCollection.tasks.map(task => {
      const isActive = this.$rxCollection.activedTask &&
        this.$rxCollection.activedTask.id === task.id

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
