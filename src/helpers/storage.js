// @flow

/**
 * Add prefix for storage item name
 * @param {string} suffix - suffix name
 */
export function storagePrefix (suffix:string):string {
  const prefix:string = process.env.RX_ROUTER_PREFIX || 'RX_ROUTER_'
  return prefix + suffix
}
