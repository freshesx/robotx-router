interface TaskItem {
  activeHistoryItemId: number
}

export default class Task {
  collection:Array<TaskItem>

  constructor () {
    this.collection = []
  }

  addItem (historyItemId:number) {
    const taskItem = {
      activeHistoryItemId: historyItemId
    }
    this.collection.push(taskItem)
    return taskItem
  }

  removeItem () {

  }

  moveItem () {

  }

  updateActiveHistory () {

  }
}
