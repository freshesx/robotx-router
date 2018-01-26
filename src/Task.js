import { TaskInterface, RecordInterface } from "./interfaces";

let uid = 0

export default class Task implements TaskInterface {
  constructor (record: RecordInterface) {
    this.uid = uid++
    this.record = record
  }
}
