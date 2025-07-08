const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const iter = (tree, ancestry = []) => {
  return tree
    .flatMap((node) => {
      const property = [...ancestry, node.key].join('.')
      switch (node.type) {
        case 'nested':
          return iter(node.children, [...ancestry, node.key])
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value2)}`
        case 'removed':
          return `Property '${property}' was removed`
        case 'updated':
          return `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
        default:
          return []
      }
    })
    .filter(Boolean)
    .join('\n')
}

export default function plain(tree) {
  return iter(tree)
}
