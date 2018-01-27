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
  addNext(page: PageInterface): RecordInterface,
  update(options: { query?: Object }): void
}

export interface TaskInterface {
  uid: number,
  record: RecordInterface
}

export interface RouterInterface {
  tasks: Array<TaskInterface>,
  active?: TaskInterface,
  records: Array<RecordInterface>,
  pages: Array<PageInterface>,
  add(): RecordInterface,
  activate(): RouterInterface,
  stringify(): string,
  parse(): void
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
