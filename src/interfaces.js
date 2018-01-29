// @flow

export interface PageInterface {
  name: string,
  component: any,
  meta: {
    [key: string]: string | number | boolean | void
  }
}

export interface RecordInterface {
  uid: number,
  page: PageInterface,
  previous: ?RecordInterface,
  next: ?RecordInterface,
  query: ?Object,
  update(options: { query?: Object }): void, // @todo: update options interface
  serialize(): Object
}

export interface RecordData {
  uid: number,
  pageName: string,
  previousId?: number,
  nextId?: number,
  query?: Object
}

export interface TaskInterface {
  uid: number,
  record: RecordInterface,
  serialize(): Object
}

export interface TaskData {
  uid: number,
  recordId: number
}

export interface parsedData {
  tasks: Array<TaskData>,
  records: Array<RecordData>,
  activeUid: number | void,
  recordMaxUid: number,
  taskMaxUid: number
}

export interface RouterInterface {
  tasks: Array<TaskInterface>,
  active: TaskInterface | void,
  records: Array<RecordInterface>,
  pages: Array<PageInterface>,
  recordMaxUid: number,
  taskMaxUid: number,
  add(name: string): TaskInterface,
  push(name: string): RouterInterface,
  activate(task: TaskInterface): RouterInterface,
  serialize(): Object,
  parse(data: parsedData): RouterInterface
}

export interface FeRouterInterface {
  vms: Array<any>, // vueComponent instance
+ store: {
    tasks: Array<TaskInterface>,
    active: TaskInterface
  },
  notify(): RouterInterface,
  bind(): RouterInterface,
  install(): RouterInterface
}
