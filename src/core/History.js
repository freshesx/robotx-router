import { storagePrefix } from '../helpers/storage'

interface HistoryItem {
  id: number,
  name: string,
  queries: ?Object,
  meta: ?Object,
  prevId: ?number,
  nextId: ?number
}

export default class History {
  /**
   * History items storage
   */
  collection: Array

  /**
   * The history item id storage
   */
  increment: number

  constructor () {
    // Pick from session storage
    this.collection = this.pickFromStorage()
    // Must run findMaxIncrement after pickFromStorage method
    this.increment = this.findMaxIncrement()
  }

  addItem (options:Object, prevItemId:?number):HistoryItem {
    if (!options.name) {
      throw new Error('Could not find item name.')
    }

    // New currentItem to aviod change item
    // Set unique id for item
    // Set prev and next
    const currentItem:HistoryItem = {
      id: this.getNextId(),
      name: options.name,
      queries: options.queries || {},
      meta: options.meta || {},
      prevId: undefined,
      nextId: undefined
    }

    // If prevItem is exits, then set prevItem's next is current item
    if (prevItemId) {
      const prevItem:HistoryItem = this.findItem(prevItemId)
      // Could not find previous item.
      if (!prevItem) {
        throw new Error('Could not find the prevItem in history.')
      }
      // Set together
      prevItem.nextId = currentItem.id
      currentItem.prevId = prevItem.id
    }

    this.collection.push(currentItem)
    this.saveIntoStorage()

    return currentItem
  }

  findItem (historyItemId:number):?HistoryItem {
    // Use reverse, because what you want to get is the latest value.
    return this.collection.reverse().find(item => item.id === historyItemId)
  }

  prevItem (historyItemId:number):?HistoryItem {
    const item = this.findItem(historyItemId)
    if (item.prevId) return this.findItem(item.prevId)
  }

  nextItem (historyItemId:number):?HistoryItem {
    const item = this.findItem(historyItemId)
    if (item.nextId) return this.findItem(item.nextId)
  }

  updateItem (historyItemId:number, { queries, meta }:{ queries:?Object, meta:?Object } = {}):?HistoryItem {
    const item = this.findItem(historyItemId)

    if (!item) {
      throw new Error('Cannot find item that you want to update.')
    }

    if (queries) {
      item.queries = queries
    }

    if (meta) {
      item.meta = meta
    }

    this.saveIntoStorage()
    return item
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

  /**
   * Find max increment value from collection
   * @protected
   */
  findMaxIncrement ():number {
    const maps = this.collection.map(item => item.id)

    return maps.length > 0
      ? Math.max(...maps) + 1 // output new max value
      : 1 // increment default value
  }

  /**
   * Get unique id
   * @private
   * @return {number}
   */
  getNextId ():number {
    return this.increment++
  }
}
