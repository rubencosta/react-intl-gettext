#! /usr/bin/env node

import { writeFileSync } from 'fs'
import program from 'commander'
import potFormatter from './json2po/potFormatter'
import messageReader from './json2po/jsonMessageReader'

program
  .command('json2pot <src> <dest>', 'converts react-intl extracted json to po/pot')
  .option('-p, --pattern', 'glob pattern used to find the src files')
  .option('-d, --use-default', 'use defaultMessage as msgstr')
  .action((src, dest, { pattern, useDefault }) => {
    writeFileSync(dest,
      potFormatter(messageReader({ cwd: src, messagesPattern: pattern }), useDefault),
    )
  })

program.parse(process.argv)
