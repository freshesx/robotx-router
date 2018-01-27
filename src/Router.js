// @flow

import { PageInterface, TaskInterface, RecordInterface, RouterInterface } from './interfaces'
import Record from './Record'
import Task from './Task'

export default class Router implements RouterInterface {
  pages: Array<PageInterface>
  records: Array<RecordInterface>
  tasks: Array<TaskInterface>
  active: ?TaskInterface
  recordMaxUid: number

  constructor (pages: Array<PageInterface>) {
    this.pages = pages || []
    this.records = []
    this.tasks = []
    this.active = undefined

    // private
    this.recordMaxUid = 0
    this.taskMaxUid = 0
  }

  notify () {
  }

  /**
   * Add new task by specify record.
   * @param {string} name name of component config item
   * @return {Task}
   */
  add (name: string): TaskInterface {
    const page: PageInterface = this.findPage(name)
    const record: RecordInterface = new Record(this.recordMaxUid++, page)
    const task: TaskInterface = new Task(this.taskMaxUid++, record)

    this.records.push(record)
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

  push (name: string): RouterInterface {
    if (this.active instanceof Task && this.active.record instanceof Record) {
      const page: PageInterface = this.findPage(name)
      const next: RecordInterface = new Record(this.recordMaxUid++, page, {
        previous: this.active.record
      })

      this.records.push(next)
      this.active.record = next
      this.notify()
    }
    return this
  }

  update (options: Object) {
    if (this.active instanceof Task && this.active.record instanceof Record) {
      this.active.record.update(options)
      this.notify()
    }
    return this
  }

  serialize (): Object {
    const obj: {
      tasks: Array<mixed>,
      records: Array<mixed>,
      activeUid: number
    } = {
      tasks: this.tasks.map(task => task.serialize()),
      records: this.records.map(record => record.serialize()),
      activeUid: this.active.uid
    }
    return obj
  }

  parse (): RouterInterface {
    return this

  findCollectionMaxUid (collection: { uid: number }): number {
    let uid: number = 0
    collection.forEach(item => {
      if (item.uid > uid) uid = item.uid
    })
    return uid
  }

  findRecord (uid: number): RecordInterface {
    const record: RecordInterface = this.records.find(record => record.uid === uid)
    if (!record) throw new Error(`Cannot find the record named ${uid}`)
    return record
  }

  findTask (uid: number): TaskInterface {
    const task: TaskInterface = this.tasks.find(task => task.uid === uid)
    if (!task) throw new Error(`Cannot find the task named ${uid}`)
    return task
  }

  /**
   * Find out component config by name.
   * @protected
   * @param {string} name  name of component config item
   * @return {ComponentConfig}
   */
  findPage (name: string): PageInterface {
    const page = this.pages.find(item => item.name === name)
    if (!page) throw new Error(`Cannot find the page named ${name}`)
    return page
  }
}
