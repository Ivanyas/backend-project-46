const getIndent = depth => '  '.repeat(depth)

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }
  const indent = getIndent(depth + 2)
  const bracketIndent = getIndent(depth + 1)
  const entries = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 2)}`
  )
  return `{
${entries.join('\n')}
${bracketIndent}}`
}

const iter = (tree, depth = 1) => {
  const indent = getIndent(depth)
  const bracketIndent = getIndent(depth - 1)
  return `{
${tree.map(node => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value1, depth)}`
      case 'updated':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`
        ].join('\n')
      case 'matched':
        return `${indent}  ${node.key}: ${stringify(node.value1, depth)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }).join('\n')}
${bracketIndent}}`
}

export default function stylish(tree) {
  return iter(tree, 1)
}
