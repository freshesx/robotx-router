import Record from '../Record'

describe('Record', () => {
  let board

  beforeEach(() => {
    board = {
      name: 'homepage',
      component: {
        template: 'Hi'
      }
    }
  })

  it('returns a created record', () => {
    const record = new Record(0, board)
    expect(record).toEqual({
      uid: 0,
      board,
      previous: undefined,
      next: undefined,
      query: undefined
    })
  })

  it('returns added next record', () => {
    const record = new Record(0, board)
    const next = new Record(1, board, {
      previous: record
    })
    expect(next).toEqual({
      uid: 1,
      board,
      previous: record,
      next: undefined,
      query: undefined
    })
    expect(record.next).toEqual(next)
  })

  it('returns new query, when update record query', () => {
    const record = new Record(0, board)
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
    const record = new Record(0, board)
    record.update({})
    expect(record.query).toEqual(undefined)
  })

  it('returns serialize record', () => {
    const record = new Record(0, board)
    const next = new Record(1, board, {
      previous: record
    })

    record.update({
      query: {
        username: 'hi'
      }
    })
    expect(record.serialize()).toEqual({
      uid: 0,
      boardName: 'homepage',
      query: {
        username: 'hi'
      },
      nextId: 1
    })
  })
})
