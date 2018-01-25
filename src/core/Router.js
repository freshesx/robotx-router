// @flow

interface RecordItem {
  id: number,
  name: string,
  prevId?: number,
  nextId?: number,
  query?: Object
}

interface TaskItem {
  id: number,
  recordId: number
}

interface componentItem {
  name: string,
  meta: ?Object,
  component: Object|Function
}

interface routesConfig {
  routes: Array<Object>
}

export default class Router {
  records:Array<RecordItem>
  tasks:Array<TaskItem>
  components:Array<componentItem>

  recordId: number
  taskId: number

  /**
   * Define router config.
   */
  constructor (options: routesConfig) {
    this.records = []
    this.tasks = []
    this.components = options.routes

    // private variable
    this.recordId = 1
    this.taskId = 1
  }

  newTaskId ():number {
    return this.taskId++
  }

  addTask (recordName:string) {
    const record:RecordItem = this.addRecord(recordName)

    const task:TaskItem = {
      id: this.newTaskId(),
      recordId: record.id
    }

    this.tasks.push(task)
  }

  newRecordId ():number {
    return this.recordId++
  }

  addRecord (name: string, params:{ query?: Object, prevId?: number } = {}):RecordItem {
    if (!name) {
      throw new Error('Could not find record item name.')
    }

    const item:RecordItem = {
      id: this.newRecordId(),
      name: name
    }

    // If has query
    if (params.query) {
      item.query = params.query
    }

    // If prevItem is exits, then set prevItem's next is current item
    if (params.prevId) {
      const prevItem:?RecordItem = this.findRecord(params.prevId)

      if (!prevItem) {
        throw new Error('Could not find the previous record item.')
      }

      prevItem.nextId = item.id
      item.prevId = prevItem.id
    }

    this.records.push(item)

    return item
  }

  findRecord (recordId: number):?RecordItem {
    // Use reverse, because what you want to get is the latest value.
    return this.records.reverse().find(item => item.id === recordId)
  }
}
