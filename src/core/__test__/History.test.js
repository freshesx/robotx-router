import History from '../History'
import { emptySessionStorage } from './mocks/sessionStorage'

describe('History', () => {
  test('#addItem with root item', () => {
    const selfItem = {
      name: 'products'
    }

    window.sessionStorage = emptySessionStorage

    const history = new History()
    history.addItem(selfItem)
    console.log(history.collection)
    const item = history.collection[0]

    expect(item.name).toEqual('products')
    expect(item.id).toEqual(0)
    expect(item.parent).toBeNull()
    expect(item.child).toBeNull()
    expect(item.queries).toEqual({})
  })

  test('#addItem, selfItem hasn\'t name.', () => {
    const selfItem = {}

    window.sessionStorage = emptySessionStorage

    const history = new History()

    expect(() => {
      history.addItem(selfItem)
    }).toThrowError()
  })
})