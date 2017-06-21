/* eslint-env mocha */

import expect from 'expect'
import mergeMessages from '../src/json2po/jsonMessageReader'

describe('json message reader', () => {
  let result
  const mergedMessages = [
    {
      defaultMessage: 'the a message',
      reference: 'src_test/moduleA.json',
      description: 'a message of the a module',
      id: 'a.a',
      translatedMessage: undefined,
    },
    {
      defaultMessage: 'the b message',
      reference: 'src_test/moduleA.json',
      description: 'b message of the a module',
      id: 'a.b',
      translatedMessage: undefined,
    },
    {
      defaultMessage: 'the a message',
      reference: 'src_test/moduleA.json',
      description: 'c message of the a module',
      id: 'a.c',
      translatedMessage: undefined,
    },
    {
      defaultMessage: 'the a message',
      reference: 'src_test/moduleB.json',
      description: 'a message of the b module',
      id: 'b.a',
      translatedMessage: undefined,
    },
    {
      defaultMessage: 'the b message',
      reference: 'src_test/moduleB.json',
      description: 'b message of the b module',
      id: 'b.b',
      translatedMessage: undefined,
    },
    {
      defaultMessage: 'the c message',
      reference: 'src_test/moduleB.json',
      description: 'c message of the b module',
      id: 'b.c',
      translatedMessage: undefined,
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

