// @flow

import { PageInterface, TaskInterface, RecordInterface, RouterInterface, StorageData, RecordData, TaskData } from './interfaces'
import Record from './Record'
import Task from './Task'

export default class Router implements RouterInterface {
  pages: Array<PageInterface>
  records: Array<RecordInterface>
  tasks: Array<TaskInterface>
  active: TaskInterface | void
  recordMaxUid: number
  taskMaxUid: number

  constructor (pages: Array<PageInterface>) {
    this.pages = pages || []
    this.records = []
    this.tasks = []
    this.active = undefined

    // private
    this.recordMaxUid = 0
    this.taskMaxUid = 0
  }

  notify (): void {
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

  default (name: string): ?TaskInterface {
    if (this.tasks.length <= 0) {
      return this.add(name)
    }
  }

  activate (task: TaskInterface): RouterInterface {
    this.active = task
    this.notify()
    return this
  }

  push (name: string): RouterInterface {
    if (this.active instanceof Task && this.active.record instanceof Record) {
      const previous: RecordInterface = this.active.record
      const page: PageInterface = this.findPage(name)
      const next: RecordInterface = new Record(this.recordMaxUid++, page, {
        previous
      })

      this.records.push(next)
      this.active && (this.active.record = next) // hack for flow lint
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

  serialize (): StorageData {
    const activeUid: number | void = this.active ? this.active.uid : undefined
    return {
      tasks: this.tasks.map(task => task.serialize()),
      records: this.records.map(record => record.serialize()),
      activeUid: activeUid,
      recordMaxUid: this.recordMaxUid,
      taskMaxUid: this.taskMaxUid
    }
  }

  parse (data: StorageData): RouterInterface {
    const { records, tasks } = data

    for (let index = 0; index < records.length; index++) {
      this.parseRecord(records[index])
    }

    for (let index = 0; index < tasks.length; index++) {
      this.parseTask(tasks[index])
    }

    this.recordMaxUid = data.recordMaxUid
    this.taskMaxUid = data.taskMaxUid

    // set active task
    data.activeUid && (this.active = this.findTask(data.activeUid))

    this.notify()
    return this
  }

  parseRecord (config: RecordData) {
    const page = this.findPage(config.pageName)
    const options = {}

    if (typeof config.previousId === 'number') {
      options.previous = this.findRecord(config.previousId)
    }

    const record = new Record(config.uid, page, options)
    this.records.push(record)
  }

  parseTask (config: TaskData) {
    const record = this.findRecord(config.recordId)
    const task = new Task(config.uid, record)
    this.tasks.push(task)
  }

  findRecord (uid: number): RecordInterface {
    const record: RecordInterface | void = this.records.find(record => record.uid === uid)
    if (!record) throw new Error(`Cannot find the record named ${uid}`)
    return record
  }

  findTask (uid: number): TaskInterface {
    const task: TaskInterface | void = this.tasks.find(task => task.uid === uid)
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
