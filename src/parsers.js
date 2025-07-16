import YAML from 'yaml'

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
      return YAML.parse(data)
    case 'yaml':
      return YAML.parse(data)
    default:
      throw new Error(`Unknown format ${format}!`)
  }
}

export default parse
