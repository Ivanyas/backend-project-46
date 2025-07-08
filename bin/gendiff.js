#!/usr/bin/env node

import { Command } from 'commander'
import gendiff from '../src/index.js'

const program = new Command()

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const option = program.opts().format
    const result = gendiff(filepath1, filepath2, option)
    console.log(result)
  })

program.parse()
