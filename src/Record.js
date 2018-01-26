// @flow

import { PageInterface, RecordInterface } from './interfaces'

let uid = 0

export default class Record implements RecordInterface {
  uid: number
  page: PageInterface
  query: ?Object
  previous: ?RecordInterface
  next: ?RecordInterface

  constructor (page: PageInterface) {
    this.uid = uid++
    this.page = page
    this.query = {}
    this.previous = undefined
    this.next = undefined
  }

  addNext (page: PageInterface): RecordInterface {
    const next: RecordInterface = new Record(page)
    this.next = next
    next.previous = this
    return next
  }

  update (options: { query?: Object } = {}) {
    this.query = options.query
  }
}
