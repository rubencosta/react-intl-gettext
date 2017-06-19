#! /usr/bin/env node

import { writeFileSync } from 'fs'
import program from 'commander'
import headerFormatter from './json2po/headerFormatter'
import potFormatter from './json2po/potFormatter'
import messageReader from './json2po/jsonMessageReader'
import poMessageReader from './po2json/poMessageReader'
import {
  getUserPackageJson,
  buildVersionFromPackageJson,
  getRepositoryUrlFromPackageJson,
} from './utils'

const list = value => value.split(',')
const userPkg = getUserPackageJson()

program
  .command('json2pot <src> <dest>')
  .description('converts react-intl extracted json to po/pot')
  .option(
    '-p, --pattern [pattern]',
    'glob pattern used to find the src files [**/*.json]',
    '**/*.json'
  )
  .option(
    '-d, --use-default <lang>',
    'use defaultMessage as msgstr and use <lang> as value for Language header field'
  )
  .option(
    '-i, --ignore <patterns>',
    'add a pattern or an array of glob patterns to exclude matches'
  )
  .option(
    '--project-id-version [version]',
    `set the value of Project-Id-Version header field [${buildVersionFromPackageJson(userPkg)}]`,
    buildVersionFromPackageJson(userPkg)
  )
  .option(
    '--report-msgid-bugs-to [url]',
    `set the value of Report-Msgid-Bugs-to header field [${getRepositoryUrlFromPackageJson(
      userPkg
    )}]`,
    getRepositoryUrlFromPackageJson(userPkg)
  )
  .action((src, dest, { pattern, useDefault, ignore, projectIdVersion, reportMsgidBugsTo }) => {
    writeFileSync(
      dest,
      potFormatter(
        messageReader({ cwd: src, messagesPattern: pattern, ignore }),
        !!useDefault,
        headerFormatter({
          projectIdVersion,
          reportMsgidBugsTo,
          language: useDefault,
        })
      )
    )
  })

program
  .command('po2json <src> <dest>')
  .description('converts po files to json')
  .option('-p, --pattern [pattern]', 'glob pattern used to find the src files [**/*.po]', '**/*.po')
  .option('--pretty', 'pretty print json')
  .option(
    '-i, --ignore <patterns>',
    'add a pattern or an array of glob patterns to exclude matches',
    list
  )
  .action((src, dest, { pattern, pretty, ignore }) => {
    writeFileSync(
      dest,
      JSON.stringify(
        poMessageReader({
          cwd: src,
          messagesPattern: pattern,
          ignore,
        }),
        null,
        pretty ? '\t' : undefined
      )
    )
  })

program.parse(process.argv)
