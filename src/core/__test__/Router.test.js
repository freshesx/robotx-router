import Router from '../Router'

describe('Test addRecords', () => {
  let router

  beforeEach(() => {
    router = new Router()
  })

  it('should returns level.1 without prev and next item.', () => {
    const item = router.addRecord('level.1')

    expect(router.records).toEqual([item])
  })

  it('should returns level.1 with next item that\'s name is level.2', () => {
    const level1 = router.addRecord('level.1')
    const level2 = router.addRecord('level.2', { prevId: level1.id })
    expect(level2.prevId).toEqual(level1.id)
    expect(level1.nextId).toEqual(level2.id)
  })

  it('throw error when add a nameless item', () => {
    expect(() => router.addRecord()).toThrowError(
      'Could not find record item name.'
    )
  })

  it('throw error when add a prevId that does not exist.', () => {
    expect(() => router.addRecord('level.1', { prevId: 10 })).toThrowError(
      'Could not find the previous record item.'
    )
  })
})
