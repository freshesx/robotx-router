// @flow

import { TaskInterface, RecordInterface } from './interfaces'

let uid = 0

export default class Task implements TaskInterface {
  uid: number
  record: RecordInterface

  constructor (record: RecordInterface) {
    this.uid = uid++
    this.record = record
  }
}
