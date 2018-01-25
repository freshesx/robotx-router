import Task from '../Task'
import History from '../History'

describe('Test empty task', () => {
  let task

  beforeEach(() => {
    task = new Task()
  })

  it('should collection include new task item', () => {
    const history = new History()
    const historyItem = history.addItem({ name: 'level.1' })

    task.addItem(historyItem.id)
    expect(task.collection).toEqual([{
      activeHistoryItemId: historyItem.id
    }])
  })
})
