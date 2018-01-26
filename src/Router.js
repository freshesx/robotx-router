import { PageInterface, TaskInterface, RecordInterface, RouterInterface } from './interfaces'
import Record from './Record'
import Task from './Task'

export default class Router implements RouterInterface {
  constructor (pages: Array<PageInterface>) {
    this.pages = pages || []
    this.records = []
    this.tasks = []
    this.active = undefined
  }

  notify () {
  }

  /**
   * Add new task by specify record.
   * @param {string} name name of component config item
   * @return {Task}
   */
  add (name: string): TaskInterface {
    const page: PageInterface = this.findPageOrFail(name)
    const record: RecordInterface = new Record(page)
    const task: TaskInterface = new Task(record)

    this.tasks.push(task)
    this.active = task
    this.notify()

    return task
  }

  activate (task: TaskInterface): RouterInterface {
    this.active = task
    this.notify()
    return this
  }

  push (name: string) {
    const page: PageInterface = this.findPageOrFail(name)
    this.active.record = this.active.record.addNext(page)
    this.notify()
    return this
  }

  update (options: Object) {
    this.active.record.update(options)
    this.notify()
    return this
  }

  /**
   * Find out component config by name.
   * @protected
   * @param {string} name  name of component config item
   * @return {ComponentConfig}
   */
  findPage (name: string): ?PageInterface {
    return this.pages.find(item => item.name === name)
  }

  findPageOrFail (name: string): PageInterface {
    const page = this.findPage(name)

    if (!page) {
      throw new Error(`Cannot find the page that named ${name}`)
    }

    return page
  }
}
