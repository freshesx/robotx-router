import Task from '../Task.js'
import Record from '../Record.js'

let page
let record

describe('Task', () => {
  beforeEach(() => {
    page = {
      name: 'homepage',
      component: {
        template: 'Hi'
      }
    }
    record = new Record(0, page)
  })

  it('returns a created task', () => {
    const task = new Task(0, record)
    expect(task).toEqual({
      uid: 0,
      record
    })
  })
})
