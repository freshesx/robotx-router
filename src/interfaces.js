export interface RouteInterface {
  name: string,
  component: any,
  meta: {
    [key: string]: string | number | boolean | void
  }
}

export interface RecordInterface {
  uid: number,
  route: RouteInterface,
  previous: RouteInterface,
  next: RouteInterface,
  query: Object,
  update(): RecordInterface
}

export interface TaskInterface {
  uid: number,
  record: RouteInterface
}

export interface RouterInterface {
  tasks: Array<TaskInterface>,
  active: TaskInterface,
  records: Array<RecordInterface>,
+ routes: Array<RouteInterface>,
+ store: {
    tasks: Array<TaskInterface>,
    active: TaskInterface
  },
  add(): RecordInterface,
  activate(): RouterInterface,
  notify(): RouterInterface,
  bind(): RouterInterface,
  install(): RouterInterface,
  stringify(): string,
  parse(): void
}