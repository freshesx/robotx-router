import History from '../History'

describe('Init router and create history', () => {
  beforeEach(() => {
    // Mock sessionStorage
    window.sessionStorage = {
      getItem: () => null,
      setItem: () => null
    }
  })

  it('returns the history item without parent item', () => {
    const history = new History()
    const selfItem = { name: 'products' }
    const savedItem = history.addItem(selfItem)

    expect(savedItem).toEqual({
      id: 1,
      name: 'products',
      parent: null,
      child: null,
      queries: {}
    })
  })

  it('throw error when add a nameless history item', () => {
    const history = new History()
    const selfItem = {}

    expect(() => {
      history.addItem(selfItem)
    }).toThrowError()
  })

  it('Second item\'s parent id should be equal to the first item\'s id', () => {
    const history = new History()
    const firstItem = { name: 'products' }
    const secondItem = { name: 'cases' }
    const firstSavedItem = history.addItem(firstItem)
    const secondSavedItem = history.addItem(secondItem, firstItem)

    expect(secondSavedItem.parent.id).toEqual(firstSavedItem.id)
  })
})
