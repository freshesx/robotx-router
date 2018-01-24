import History from '../History'
import { emptySessionStorage } from './mocks/sessionStorage'

describe('History', () => {
  test('#addItem: add a history item without parent', () => {
    const selfItem = {
      name: 'products'
    }

    window.sessionStorage = emptySessionStorage

    const history = new History()
    const savedItem = history.addItem(selfItem)

    expect(savedItem).toEqual({
      id: 1,
      name: 'products',
      parent: null,
      child: null,
      queries: {}
    })
  })

  test('#addItem: add a history item without it\'s name', () => {
    const selfItem = {}

    window.sessionStorage = emptySessionStorage

    const history = new History()

    expect(() => {
      history.addItem(selfItem)
    }).toThrowError()
  })

  test('#addItem: add a history item and then add it\'s child history item', () => {
    // setup
    window.sessionStorage = emptySessionStorage
    const history = new History()
    
    const firstItem = { name: 'products' }
    const secondItem = { name: 'cases' }

    const firstSavedItem = history.addItem(firstItem)
    const secondSavedItem = history.addItem(secondItem, firstItem)
    expect(secondSavedItem.parent.id).toEqual(firstSavedItem.id)
  })
})
