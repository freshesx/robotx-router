// @flow

export interface QueryInterface {
  [key: string]: string | number | boolean | void | null | QueryInterface
}

export interface PageInterface {
  name: string,
  component: any,
  meta: {
    [key: string]: any
  }
}

export interface RecordInterface {
  uid: number,
  page: PageInterface,
  previous: RecordInterface | void,
  next: RecordInterface | void,
  query: QueryInterface | void,
  update(options: { query?: QueryInterface }): void, // @todo: update options interface
  serialize(): Object
}

export interface RecordData {
  uid: number,
  pageName: string,
  previousId?: number,
  nextId?: number,
  query?: QueryInterface
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

export interface StorageData {
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
  notify(): void,
  add(name: string): TaskInterface,
  push(name: string): RouterInterface,
  activate(task: TaskInterface): RouterInterface,
  serialize(): Object,
  parse(data: StorageData): RouterInterface
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
