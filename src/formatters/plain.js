const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const typeHandlers = {
  nested: (node, ancestry, iter) => iter(node.children, [...ancestry, node.key]),
  added: (node, ancestry) => `Property '${[...ancestry, node.key].join('.')}' was added with value: ${formatValue(node.value2)}`,
  removed: (node, ancestry) => `Property '${[...ancestry, node.key].join('.')}' was removed`,
  updated: (node, ancestry) => `Property '${[...ancestry, node.key].join('.')}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`,
  matched: () => [],
}

const iter = (tree, ancestry = []) => {
  return tree
    .flatMap((node) => {
      const handler = typeHandlers[node.type]
      if (!handler) throw new Error(`Unknown type ${node.type}.`)
      return handler(node, ancestry, iter)
    })
    .filter(Boolean)
    .join('\n')
}

export default function plain(tree) {
  return iter(tree)
}
