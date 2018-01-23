import { storagePrefix } from '../helpers/storage'

interface HistoryItem {
  id: number | void,
  name: string,
  queries: Object | void, // @todo Study flow docs to find the solution of key-value structure
  parent: HistoryItem | void | null,
  child: HistoryItem | void | null
}

export default class History {
  collection: Array

  increment: number

  constructor () {
    this.collection = this.pickFromStorage()
    // @todo this.collection 最大的 id 赋值
  }

  getNextId ():number {
    return this.increment++
  }

  addItem (selfItem:HistoryItem, parentItem:HistoryItem):void {
    selfItem.id = this.getNextId()
    selfItem.parent = parentItem
    selfItem.child = null
    if (!selfItem.queries) selfItem.queries = {}
    if (!selfItem.name) {
      throw new Error('You should set route name')
    }

    this.collection.push(selfItem)
    this.saveIntoStorage()
  }

  updateItem () {

  }

  prevItem () {

  }

  nextItem () {

  }

  findItem () {

  }

  /**
   * Pick out collection from storage
   * @protected
   */
  pickFromStorage ():Array<mixed> {
    const output:(string | null) = window.sessionStorage.getItem(
      storagePrefix('HISTORY')
    )

    // default value
    if (typeof output !== 'string') return []

    // @todo update Array<mixed> to interface.
    return JSON.parse(output)
  }

  /**
   * Save collection into storage
   * @protected
   */
  saveIntoStorage ():void {
    const output:string = JSON.stringify(this.collection)
    window.sessionStorage.setItem(storagePrefix('HISTORY'), output)
  }
}
