import getStylishOutput from './stylish.js';
import getPlainOutut from './plain.js';

const getOutput = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylishOutput(data);
    case 'plain':
      return getPlainOutut(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default getOutput;