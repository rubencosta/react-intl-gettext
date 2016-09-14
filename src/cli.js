#! /usr/bin/env node

import { writeFileSync } from 'fs'
import program from 'commander'
import potFormatter from './json2po/potFormatter'
import messageReader from './json2po/jsonMessageReader'
import poMessageReader from './po2json/poMessageReader'

const list = (value) => value.split(',')

program
  .command('json2pot <src> <dest>')
  .description('converts react-intl extracted json to po/pot')
  .option(
    '-p, --pattern [pattern]',
    'glob pattern used to find the src files [**/*.json]',
    '**/*.json',
  )
  .option('-d, --use-default', 'use defaultMessage as msgstr')
  .option(
    '-i, --ignore <patterns>',
    'add a pattern or an array of glob patterns to exclude matches',
    list,
  )
  .action((src, dest, { pattern, useDefault, ignore }) => {
    writeFileSync(
      dest,
      potFormatter(messageReader({ cwd: src, messagesPattern: pattern, ignore }), useDefault),
    )
  })

program.command('po2json <src> <dest>')
  .description('converts po files to json')
  .option(
    '-p, --pattern [pattern]',
    'glob pattern used to find the src files [**/*.po]',
    '**/*.po',
  )
  .option('--pretty', 'pretty print json')
  .option(
    '-i, --ignore <patterns>',
    'add a pattern or an array of glob patterns to exclude matches',
    list,
  )
  .action((src, dest, { pattern, pretty, ignore }) => {
    writeFileSync(
      dest,
      JSON.stringify(poMessageReader({
        cwd: src,
        messagesPattern: pattern,
        ignore,
      }), null, pretty ? '\t' : undefined)
    )
  })

program.parse(process.argv)
