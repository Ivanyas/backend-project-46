import _ from 'lodash'

const getMergeAndSortedKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const unionKeys = _.union(keys1, keys2)
  return _.sortBy(unionKeys)
}

const compare = (data1, data2) => {
  const keys = getMergeAndSortedKeys(data1, data2)
  const result = keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    switch (true) {
      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return { key, children: compare(value1, value2), type: 'nested' }
      case _.has(data1, key) && !_.has(data2, key):
        return { key, value1, type: 'removed' }
      case !_.has(data1, key) && _.has(data2, key):
        return { key, value2, type: 'added' }
      case _.isEqual(value1, value2):
        return { key, value1, type: 'matched' }
      default:
        return {
          key, value1, value2, type: 'updated',
        }
    }
  })
  return result
}

export default compare
