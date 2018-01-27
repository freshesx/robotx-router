// @flow

import { PageInterface, RecordInterface } from './interfaces'

interface CtorOptions {
  previous?: RecordInterface
}

export default class Record implements RecordInterface {
  uid: number
  page: PageInterface
  query: ?Object
  previous: ?RecordInterface
  next: ?RecordInterface

  constructor (uid: number, page: PageInterface, options: CtorOptions = {}) {
    this.uid = uid
    this.page = page
    this.query = {}
    this.previous = undefined
    this.next = undefined

    // If the previous is exist
    if (options.previous instanceof Record) {
      this.previous = options.previous
      options.previous.next = this
    }
  }

  update (options: { query?: Object } = {}) {
    if (options.query) {
      this.query = options.query
    }
  }

  serialize (): Object {
    const obj: {
      uid: number,
      pageName: string,
      query?: Object,
      previousId?: number,
      nextId?: number
    } = {
      uid: this.uid,
      pageName: this.page.name
    }

    if (this.query) obj.query = this.query
    if (this.previous instanceof Record) obj.previousId = this.previous.uid
    if (this.next instanceof Record) obj.nextId = this.next.uid

    return obj
  }
}
