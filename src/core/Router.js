// @flow
import History from './History'

export default class Router {
  /**
   * Store routes config
   */
  // routes: any
  history: History

  /**
   * Define router config.
   */
  constructor () {
    this.history = new History()
  }

  push (routeName:string, routeQueries:Object, taskId:number) {

  }

  update (routeQueries:Object, historyId:number) {

  }

  toggle (taskId:number) {

  }

  pushNew (routeName:string, routeQueries:object) {

  }

  destroy (taskId:number, needActiveTaskId:number) {

  }
}
