import Task from '../Task.js'
import Record from '../Record.js'

let board
let record

describe('Task', () => {
  beforeEach(() => {
    board = {
      name: 'homepage',
      component: {
        template: 'Hi'
      }
    }
    record = new Record(0, board)
  })

  it('returns a created task', () => {
    const task = new Task(0, record)
    expect(task).toEqual({
      uid: 0,
      record
    })
  })
})
