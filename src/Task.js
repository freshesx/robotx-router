// @flow

import { TaskInterface, RecordInterface } from './interfaces'

export default class Task implements TaskInterface {
  uid: number
  record: RecordInterface

  constructor (uid: number, record: RecordInterface) {
    this.uid = uid
    this.record = record
  }

  serialize () {
    return {
      uid: this.uid,
      recordId: this.record.uid
    }
  }
}
