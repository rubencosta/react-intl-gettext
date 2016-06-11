/* eslint-env mocha */

import { readFileSync } from 'fs'
import expect from 'expect'
import mergeMessages from '../src/mergeMessages'
import potFormatter from '../src/potFormatter'

describe(
  'format messages to pot string', () => {
    let result
    const formmatedString = readFileSync('./test/fixtures/pot/extracted.pot', 'utf-8')
    beforeEach(
      () => {
        result = potFormatter(
          mergeMessages(
            '**/*.json', {
              cwd: 'test/fixtures/messages',
            }
          )
        )
      }
    )
    it(
      'should map all messages', () => {
        expect(result).toEqual(formmatedString)
      }
    )
  }
)

