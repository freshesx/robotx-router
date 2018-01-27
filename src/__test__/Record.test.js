import Record from '../Record'

describe('Record', () => {
  let page

  beforeEach(() => {
    page = {
      name: 'homepage',
      component: {
        template: 'Hi'
      }
    }
  })

  it('create a record', () => {
    const record = new Record(0, page)
    expect(record).toEqual({
      uid: 0,
      page,
      previous: undefined,
      next: undefined,
      query: {}
    })
  })

  it('add next record', () => {
    const record = new Record(0, page)
    const next = new Record(1, page, {
      previous: record
    })
    expect(next).toEqual({
      uid: 1,
      page,
      previous: record,
      next: undefined,
      query: {}
    })
    expect(record.next).toEqual(next)
  })
})
