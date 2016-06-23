/* eslint-env mocha */

import expect from 'expect'
import mergeMessages from '../src/json2po/jsonMessageReader'

describe('json message reader', () => {
  let result
  const mergedMessages = [
    {
      msgstr: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'a message of the a module',
      msgid: 'a.a',
    },
    {
      msgstr: 'the b message',
      reference: 'src_test/moduleA.json',
      extracted: 'b message of the a module',
      msgid: 'a.b',
    },
    {
      msgstr: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'c message of the a module',
      msgid: 'a.c',
    },
    {
      msgstr: 'the a message',
      reference: 'src_test/moduleB.json',
      extracted: 'a message of the b module',
      msgid: 'b.a',
    },
    {
      msgstr: 'the b message',
      reference: 'src_test/moduleB.json',
      extracted: 'b message of the b module',
      msgid: 'b.b',
    },
    {
      msgstr: 'the a message',
      reference: 'src_test/moduleB.json',
      extracted: 'c message of the b module',
      msgid: 'b.c',
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

