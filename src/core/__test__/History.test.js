import History from '../History'

describe('Test empty history', () => {
  let history

  beforeAll(() => {
    // Mock sessionStorage
    window.sessionStorage = {
      getItem: () => null,
      setItem: () => null
    }
  })

  beforeEach(() => {
    history = new History()
  })

  it('should returns level.1 without prev and next item.', () => {
    const outputItem = history.addItem({ name: 'level.1' })

    expect(outputItem).toEqual({
      id: 1,
      name: 'level.1',
      prevId: undefined,
      nextId: undefined,
      queries: {}
    })
  })

  it('should returns level.1 with next item that\'s name is level.2', () => {
    const level1 = history.addItem({ name: 'level.1 ' })
    const level2 = history.addItem({ name: 'level.2' }, level1.id)
    expect(level2.prevId).toEqual(level1.id)
    expect(level1.nextId).toEqual(level2.id)
  })

  it('throw error when add a nameless item', () => {
    expect(() => history.addItem({})).toThrowError(
      'Could not find item name.'
    )
  })

  it('throw error when add a prevId that does not exist.', () => {
    expect(() => history.addItem({ name: 'level.1' }, 10)).toThrowError(
      'Could not find the prevItem in history.'
    )
  })
})

describe('Test three history items', () => {
  let history

  beforeAll(() => {
    // Mock sessionStorage
    window.sessionStorage = {
      getItem: () => null,
      setItem: () => null
    }
  })

  beforeEach(() => {
    history = new History()
    history.addItem({ name: 'level.1' })
    history.addItem({ name: 'level.2' })
    history.addItem({ name: 'level.3' })
  })

  it('Find item by id', () => {
    expect(history.findItem(1).name).toEqual('level.1')
    expect(history.findItem(2).name).toEqual('level.2')
    expect(history.findItem(3).name).toEqual('level.3')
  })

  it('should return undefined, if you find item that don\'t exist.', () => {
    expect(history.findItem(10)).toBeUndefined()
  })
})
