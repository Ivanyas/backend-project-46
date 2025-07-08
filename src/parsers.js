import YAML from 'yaml'

const parse = (fileData, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileData)
    case 'yml':
      return YAML.parse(fileData)
    case 'yaml':
      return YAML.parse(fileData)
    default:
      throw new Error(`Unknown format ${format}!`)
  }
}

export default parse
