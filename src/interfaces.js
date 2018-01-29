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

export interface StoryboardInterface {
  tasks: Array<TaskInterface>,
  active: TaskInterface | void,
  records: Array<RecordInterface>,
  pages: Array<PageInterface>,
  recordMaxUid: number,
  taskMaxUid: number,
  notify(): void,
  add(name: string): TaskInterface,
  push(name: string): StoryboardInterface,
  activate(task: TaskInterface): StoryboardInterface,
  serialize(): StorageData,
  parse(data: StorageData): StoryboardInterface
}

export interface FeRouterInterface {
  vueReactiveName: string,
  vms: Array<any>, // vueComponent instance
  notify(): StoryboardInterface,
  bind(): StoryboardInterface,
  install(): StoryboardInterface
}
