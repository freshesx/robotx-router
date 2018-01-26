import { PageInterface, RecordInterface } from './interfaces'

let uid = 0

export default class Record implements RecordInterface {
  constructor (page: PageInterface) {
    this.uid = uid++
    this.page = page
    this.query = {}
    this.previous = undefined
    this.next = undefined
  }

  addNext (page: PageInterface) {
    const next = new Record(page)
    this.next = next
    next.previous = this
    return next
  }

  update ({ query }) {
    this.query = query
  }
}
