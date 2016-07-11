/* eslint-env mocha */

import expect from 'expect'
import mergeMessages from '../src/json2po/jsonMessageReader'

describe('json message reader', () => {
  let result
  const mergedMessages = [
    {
      msgid: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'a message of the a module',
      msgstr: 'a.a',
    },
    {
      msgid: 'the b message',
      reference: 'src_test/moduleA.json',
      extracted: 'b message of the a module',
      msgstr: 'a.b',
    },
    {
      msgid: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'c message of the a module',
      msgstr: 'a.c',
    },
    {
      msgid: 'the a message',
      reference: 'src_test/moduleB.json',
      extracted: 'a message of the b module',
      msgstr: 'b.a',
    },
    {
      msgid: 'the b message',
      reference: 'src_test/moduleB.json',
      extracted: 'b message of the b module',
      msgstr: 'b.b',
    },
    {
      msgid: 'the c message',
      reference: 'src_test/moduleB.json',
      extracted: 'c message of the b module',
      msgstr: 'b.c',
    },
  ]
  beforeEach(() => {
    result = mergeMessages({
      messagesPattern: '**/*.json',
      cwd: 'test/fixtures/messages',
    })
  })
  it('should map all messages', () => {
    expect(result).toEqual(mergedMessages)
  })
})

