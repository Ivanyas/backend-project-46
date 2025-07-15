import _ from 'lodash'

const getLeftIndent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - 2))
const getRightIndent = (depth, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - spacesCount))

const getString = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`
  const currentValue = Object.entries(data)
  const line = currentValue.map(([key, value]) => `${getLeftIndent(depth)}  ${key}: ${getString(value, depth + 1)}`)
  return ['{', ...line, `${getRightIndent(depth)}}`].join('\n')
}

const getOutput = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const line = currentValue.flatMap((node) => {
      const {
        key, children, type, value1, value2,
      } = node
      switch (type) {
        case 'nested':
          return `${getLeftIndent(depth)}  ${key}: ${iter(children, depth + 1)}`
        case 'removed':
          return `${getLeftIndent(depth)}- ${key}: ${getString(value1, depth + 1)}`
        case 'added':
          return `${getLeftIndent(depth)}+ ${key}: ${getString(value2, depth + 1)}`
        case 'matched':
          return `${getLeftIndent(depth)}  ${key}: ${getString(value1, depth + 1)}`
        case 'updated':
          return [
            `${getLeftIndent(depth)}- ${key}: ${getString(value1, depth + 1)}`,
            `${getLeftIndent(depth)}+ ${key}: ${getString(value2, depth + 1)}`]
        default:
          throw new Error(`Unknown type ${type}.`)
      }
    })
    return ['{', ...line, `${getRightIndent(depth)}}`].join('\n')
  }
  return iter(tree)
}

export default getOutput
