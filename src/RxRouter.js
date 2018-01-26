interface ComponentConfig {
  name: string,
  component?: Object,
  meta?: Object
}

interface Record {
  id: number,
  name: string,
  component: ComponentConfig,
  query?: Object,
  previous?: Record,
  next: Record
}

interface Task {
  id: number,
  record: Record
}

interface ConstructorOptions {
  components: Array<ComponentConfig>
}

export default class RxRouter {
  tasks: Array<Task>
  records: Array<Record>
  components: Array<ComponentConfig>
  activedTask: ?Task
  activedTaskId: ?number
  maxTaskId: number
  maxRecordId: number
  vms: Array<any>

  constructor (options: ConstructorOptions) {
    this.components = options.components || []
    this.records = []
    this.tasks = []
    this.activedTask = {}
    this.maxTaskId = 1
    this.maxRecordId = 1
    this.vms = [] // meaning vueComponents
  }

  get collection () {
    return {
      components: this.components,
      records: this.records,
      tasks: this.tasks,
      activedTask: this.activedTask
    }
  }

  /**
   * Manually set self to bind vue component instance
   * @param {*} vm 
   */
  bind (vm: any) {
    this.vms.push(vm)
  }

  /**
   * Manually notify that collection is updated.
   */
  notify (collection):void {
    // notify vue to update reactive data
    this.vms.forEach(vm => {
      vm._rxCollection = this.collection
    })
    // @todo notify session storage to save data
  }

  /**
   * Add new task by specify record.
   * @param {string} name name of component config item
   * @return {Task}
   */
  addTask (name: string): Task {
    const task: Task = {
      id: this.maxTaskId++,
      record: this.addRecord(name)
    }

    this.tasks.push(task)

    // If the tasks.length === 1, set current task is active
    if (this.tasks.length === 1) {
      this.activeTask(task)
    }

    return task
  }

  activeTask (task: Task) {
    // this.activedTask.push(task)
    this.activedTask = task
    this.notify && this.notify(task)
  }

  /**
   * Add new record by component config.
   * @protected
   * @param {string} name name of component config item
   * @return {Record}
   */
  addRecord (name: string): Record {
    const record: Record = {
      id: this.maxRecordId++,
      name,
      component: this.findComponent(name)
    }

    this.records.push(record)
    return record
  }

  /**
   * Find out component config by name.
   * @protected
   * @param {string} name  name of component config item
   * @return {ComponentConfig}
   */
  findComponent (name: string): ComponentConfig {
    const component = this.components.find(item => item.name === name)

    if (!component) {
      throw new Error(`Cannot find the '${name}' component config.`)
    }

    return component
  }
}
