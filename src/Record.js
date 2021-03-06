// @flow

import type { BoardInterface, RecordInterface, QueryInterface } from './interfaces'

interface CtorOptions {
  previous?: RecordInterface
}

export default class Record implements RecordInterface {
  uid: number
  board: BoardInterface
  query: QueryInterface | void
  previous: RecordInterface | void
  next: RecordInterface | void

  constructor (uid: number, board: BoardInterface, options: CtorOptions = {}) {
    this.uid = uid
    this.board = board
    this.query = undefined
    this.previous = undefined
    this.next = undefined

    // If the previous is exist
    if (options.previous instanceof Record) {
      options.previous.next = this
      this.previous = options.previous
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
      boardName: string,
      query?: Object,
      previousId?: number,
      nextId?: number
    } = {
      uid: this.uid,
      boardName: this.board.name
    }

    if (this.query) obj.query = this.query
    if (this.previous instanceof Record) obj.previousId = this.previous.uid
    if (this.next instanceof Record) obj.nextId = this.next.uid

    return obj
  }
}
