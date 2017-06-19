/* eslint-env mocha */

import { readFileSync } from 'fs'
import expect from 'expect'
import mergeMessages from '../src/json2po/jsonMessageReader'
import potFormatter from '../src/json2po/potFormatter'

describe('message formatter', () => {
  let result
  let formattedString
  let header
  context('called without copyDefaultTranslation', () => {
    beforeEach(() => {
      formattedString = readFileSync('./test/fixtures/pot/extracted.pot', 'utf-8')
      result = potFormatter(
        mergeMessages({
          messagesPattern: '**/*.json',
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
        mergeMessages({
          messagesPattern: '**/*.json',
          cwd: 'test/fixtures/messages',
        }), true)
    })
    it('should map all messages to po', () => {
      expect(result).toEqual(formattedString)
    })
  })
  context('called with header', () => {
    beforeEach(() => {
      formattedString = readFileSync('./test/fixtures/pot/extractedWithHeader.pot', 'utf-8')
      header = 'test header'
      result = potFormatter(
        mergeMessages({
          messagesPattern: '**/*.json',
          cwd: 'test/fixtures/messages',
        }), false, header)
    })
    it('should map all messages to po', () => {
      expect(result).toEqual(formattedString)
    })
  })
})

