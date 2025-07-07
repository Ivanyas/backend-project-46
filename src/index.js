import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import compare from './compare.js';
import getOutput from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileType = (filepath) => path.extname(filepath).slice(1);
const getFileData = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getFilePath(filepath1);
  const fileType1 = getFileType(filepath1);
  const fileData1 = getFileData(path1);

  const path2 = getFilePath(filepath2);
  const fileType2 = getFileType(filepath2);
  const fileData2 = getFileData(path2);

  const parseData1 = parse(fileData1, fileType1);
  const parseData2 = parse(fileData2, fileType2);
  const compareData = compare(parseData1, parseData2);
  return getOutput(compareData, format);
};

export default gendiff;