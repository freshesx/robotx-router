// @flow

import type { BoardInterface, TaskInterface, RecordInterface, StoryboardInterface, StorageData, RecordData, TaskData } from './interfaces'
import Record from './Record'
import Task from './Task'

export default class Storyboard implements StoryboardInterface {
  boards: Array<BoardInterface>
  records: Array<RecordInterface>
  tasks: Array<TaskInterface>
  active: TaskInterface | void
  recordMaxUid: number
  taskMaxUid: number

  constructor (boards: Array<BoardInterface>) {
    this.boards = boards || []
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
    const board: BoardInterface = this.findBoard(name)
    const record: RecordInterface = new Record(this.recordMaxUid++, board)
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

  activate (task: TaskInterface): StoryboardInterface {
    this.active = task
    this.notify()
    return this
  }

  push (name: string): StoryboardInterface {
    if (this.active instanceof Task && this.active.record instanceof Record) {
      const previous: RecordInterface = this.active.record
      const board: BoardInterface = this.findBoard(name)
      const next: RecordInterface = new Record(this.recordMaxUid++, board, {
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

  parse (data: StorageData): StoryboardInterface {
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
    const board = this.findBoard(config.boardName)
    const options = {}

    if (typeof config.previousId === 'number') {
      options.previous = this.findRecord(config.previousId)
    }

    const record = new Record(config.uid, board, options)
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
  findBoard (name: string): BoardInterface {
    const board = this.boards.find(item => item.name === name)
    if (!board) throw new Error(`Cannot find the board named ${name}`)
    return board
  }
}
