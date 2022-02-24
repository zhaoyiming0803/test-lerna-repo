/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
 export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}

/**
 * If has not prefix of
 * /*#__PURE__
 * only if testVar be used, and makeMap not be used
 * makeMap also will be built in dist
 */
export const testCallMakeMap = /*#__PURE__*/ makeMap('1,2,3,4,5')

export const testVar = 12345
