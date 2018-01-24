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
      prev: null,
      next: null,
      queries: {}
    })
  })

  it('should returns level.1 with next item that\'s name is level.2', () => {
    const level1Item = history.addItem({ name: 'level.1 ' })
    const level2Item = history.addItem({ name: 'level.2' }, level1Item)
    expect(level2Item.prev.name).toEqual(level1Item.name)
  })

  it('throw error when add a nameless item', () => {
    expect(() => history.addItem({})).toThrowError()
  })
})
