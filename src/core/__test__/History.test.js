import History from '../History'

describe('Test empty history', () => {
  let history

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
      queries: {},
      meta: {}
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

describe('Test one history item', () => {
  let history

  beforeEach(() => {
    history = new History()
    history.addItem({ name: 'level.1' })
  })

  it('throw error because cannot find exist id', () => {
    expect(() => history.updateItem(10)).toThrowError(
      'Cannot find item that you want to update.'
    )
  })

  it('should returns old data, if queries and meta is not exist', () => {
    const item = history.updateItem(1)
    expect(item.queries).toEqual({})
    expect(item.meta).toEqual({})
  })

  it('should returns new data, if queries and meta is exist', () => {
    const item = history.updateItem(1, {
      queries: { page: 1 },
      meta: { title: 'Hello' }
    })
    expect(item.queries).toEqual({ page: 1 })
    expect(item.meta).toEqual({ title: 'Hello' })
  })
})

describe('Test three history items', () => {
  let history

  beforeEach(() => {
    history = new History()
    const level1 = history.addItem({ name: 'level.1' })
    const level2 = history.addItem({ name: 'level.2' }, level1.id)
    history.addItem({ name: 'level.3' }, level2.id)
  })

  it('Find item by id', () => {
    expect(history.findItem(1).name).toEqual('level.1')
    expect(history.findItem(2).name).toEqual('level.2')
    expect(history.findItem(3).name).toEqual('level.3')
  })

  it('should return undefined, if you find item that don\'t exist.', () => {
    expect(history.findItem(10)).toBeUndefined()
  })

  it('should returns undefined, if you find previous item of level.1.', () => {
    expect(history.prevItem(1)).toBeUndefined()
  })

  it('should returns level.1, if you find previous item of level.2', () => {
    expect(history.prevItem(2).name).toEqual('level.1')
  })

  it('should returns level.3, if you find next item of level.2', () => {
    expect(history.nextItem(2).name).toEqual('level.3')
  })

  it('should returns undefined, if you find next item of level.3', () => {
    expect(history.nextItem(3)).toBeUndefined()
  })
})

describe('Test sessionStorage', () => {
  it('should returns empty array, if cannot find session storage item.', () => {
    window.sessionStorage = {
      getItem: () => null,
      setItem: () => null
    }

    const history = new History()
    expect(history.collection).toEqual([])
  })

  it('should returns history item', () => {
    const output = [{
      id: 1,
      name: 'level.1',
      queries: {},
      meta: {},
      prevId: undefined,
      nextId: 2
    }, {
      id: 2,
      name: 'level.2',
      queries: {},
      meta: { title: 'Hello' },
      prevId: 1,
      nextId: undefined
    }]
    window.sessionStorage = {
      getItem: () => JSON.stringify(output),
      setItem: () => null
    }

    const history = new History()
    expect(history.collection).toEqual(output)
    expect(history.increment).toEqual(3)

    const products = history.addItem({ name: 'products' })
    expect(products.id).toEqual(3)
  })
})
