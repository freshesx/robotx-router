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
    const record = new Record(page)
    expect(record).toEqual({
      uid: 0,
      page,
      previous: undefined,
      next: undefined,
      query: {}
    })
  })

  it('add next record', () => {
    const record = new Record(page)
    const next = new Record(page, {
      previous: record
    })
    expect(next).toEqual({
      uid: 2,
      page,
      previous: record,
      next: undefined,
      query: {}
    })
    expect(record.next).toEqual(next)
  })
})
