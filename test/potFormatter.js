/* eslint-env mocha */

import { readFileSync } from 'fs'
import expect from 'expect'
import mergeMessages from '../src/mergeMessages'
import potFormatter from '../src/potFormatter'

describe('message formatter', () => {
  let result
  let formattedString
  context('called without copyDefaultTranslation', () => {
    beforeEach(() => {
      formattedString = readFileSync('./test/fixtures/pot/extracted.pot', 'utf-8')
      result = potFormatter(
        mergeMessages('**/*.json', {
          cwd: 'test/fixtures/messages',
        }))
    })
    it('should map all messages to pot', () => {
      expect(result).toEqual(formattedString)
    })
  })
  context('called with copyDefaultTranslation', () => {
    beforeEach(() => {
      formattedString = readFileSync('./test/fixtures/pot/extractedWithDefault.po', 'utf-8')
      result = potFormatter(
        mergeMessages('**/*.json', {
          cwd: 'test/fixtures/messages',
        }), true)
    })
    it('should map all messages to po', () => {
      expect(result).toEqual(formattedString)
    })
  })
})

