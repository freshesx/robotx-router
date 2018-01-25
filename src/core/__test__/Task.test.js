import Task from '../Task'

describe('Test empty task', () => {
  let task

  beforeEach(() => {
    task = new Task()
  })

  it('should collection include new task item', () => {
    const item = task.addItem(1)
    expect(task.collection).toEqual([item])
  })

  it('should return task item that you want to find.', () => {
    const taskItem = task.addItem(1)
    const finded = task.findItem(taskItem.id)
    expect(finded.activeHistoryItemId).toEqual(1)
  })

  it('collection returns empty when remove task item', () => {
    const taskItem = task.addItem(1)
    task.removeItem(taskItem.id)
    expect(task.collection).toEqual([])
  })

  it('collection returns error when remove task item that does not exist', () => {
    const taskItem = task.addItem(1)
    expect(() => task.removeItem(0)).toThrowError(
      'Could not find task item.'
    )
  })

  it('should returns 2 history item, when update task item active history item.', () => {
    const taskItem = task.addItem(1)
    task.updateActiveHistory(taskItem.id, 2)
    expect(taskItem.activeHistoryItemId).toEqual(2)
  })
})
