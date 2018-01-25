interface TaskItem {
  id: number,
  activeHistoryItemId: number
}

export default class Task {
  collection:Array<TaskItem>

  constructor () {
    this.collection = []
  }

  findItem (taskItemId:number) {
    return this.collection.find(item => item.id === taskItemId)
  }

  addItem (historyItemId:number) {
    const taskItem = {
      id: new Date().getTime(),
      activeHistoryItemId: historyItemId
    }
    this.collection.push(taskItem)
    return taskItem
  }

  removeItem (taskItemId: number) {
    const finded = this.findItem(taskItemId)

    if (!finded) {
      throw new Error('Could not find task item.')
    }

    return this.collection.splice(this.collection.indexOf(finded), 1)
  }

  updateActiveHistory (taskItemId:number, historyItemId:number) {
    const finded = this.findItem(taskItemId)

    if (!finded) {
      throw new Error('Could not find task item.')
    }

    finded.activeHistoryItemId = historyItemId
  }
}
