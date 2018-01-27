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

  it('returns a created record', () => {
    const record = new Record(0, page)
    expect(record).toEqual({
      uid: 0,
      page,
      previous: undefined,
      next: undefined,
      query: {}
    })
  })

  it('returns added next record', () => {
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

  it('returns new query, when update record query', () => {
    const record = new Record(0, page)
    record.update({
      query: {
        username: 'hi'
      }
    })
    expect(record.query).toEqual({
      username: 'hi'
    })
  })

  it('returns empty, when update empty query', () => {
    const record = new Record(0, page)
    record.update({})
    expect(record.query).toEqual({})
  })

  it('returns serialize record', () => {
    const record = new Record(0, page)
    const next = new Record(1, page, {
      previous: record
    })

    record.update({
      query: {
        username: 'hi'
      }
    })
    expect(record.serialize()).toEqual({
      uid: 0,
      pageName: 'homepage',
      query: {
        username: 'hi'
      },
      nextId: 1
    })
  })
})
