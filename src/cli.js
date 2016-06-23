#! /usr/bin/env node

import { writeFileSync } from 'fs'
import program from 'commander'
import potFormatter from './json2po/potFormatter'
import messageReader from './json2po/jsonMessageReader'

program
  .command('json2pot <src> <dest>', 'converts react-intl extracted json to po/pot')
  .option('-p, --pattern', 'glob pattern used to find the src files')
  .action((src, dest, { pattern }) => {
    writeFileSync(dest, potFormatter(messageReader({ cwd: src, messagesPattern: pattern })))
  })

program.parse(process.argv)
