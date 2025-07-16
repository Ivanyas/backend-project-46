import _ from 'lodash'

const getIndent = (depth, offset = 0, replacer = ' ', spacesCount = 4) => (
  replacer.repeat((depth * spacesCount) - offset)
)

const getString = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`
  const currentValue = Object.entries(data)
  const line = currentValue.map(([key, value]) => `${getIndent(depth, 2)}  ${key}: ${getString(value, depth + 1)}`)
  return ['{', ...line, `${getIndent(depth, 4)}}`].join('\n')
}

const typeHandlers = {
  nested: (node, depth, iter) => `${getIndent(depth, 2)}  ${node.key}: ${iter(node.children, depth + 1)}`,
  removed: (node, depth) => `${getIndent(depth, 2)}- ${node.key}: ${getString(node.value1, depth + 1)}`,
  added: (node, depth) => `${getIndent(depth, 2)}+ ${node.key}: ${getString(node.value2, depth + 1)}`,
  matched: (node, depth) => `${getIndent(depth, 2)}  ${node.key}: ${getString(node.value1, depth + 1)}`,
  updated: (node, depth) => [
    `${getIndent(depth, 2)}- ${node.key}: ${getString(node.value1, depth + 1)}`,
    `${getIndent(depth, 2)}+ ${node.key}: ${getString(node.value2, depth + 1)}`
  ],
}

const getOutput = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const line = currentValue.flatMap((node) => {
      const handler = typeHandlers[node.type]
      if (!handler) throw new Error(`Unknown type ${node.type}.`)
      return handler(node, depth, iter)
    })
    return ['{', ...line, `${getIndent(depth, 4)}}`].join('\n')
  }
  return iter(tree)
}

export default getOutput
