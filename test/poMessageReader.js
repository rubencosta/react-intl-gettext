/* eslint-env mocha */

import expect from 'expect'
import poMessageReader from '../src/po2json/poMessageReader'

describe('po message reader', () => {
  let result
  const expected = {
    'en-US': {
      'a.a': 'the a message',
      'a.b': 'the b message',
      'a.c': 'the a message',
      'b.a': 'the a message',
      'b.b': 'the b message',
      'b.c': 'the a message',
    },
    pt_PT: {
      'a.a': 'the a message',
      'a.b': 'the b message',
      'a.c': 'the a message',
      'b.a': 'the a message',
      'b.b': 'the b message',
      'b.c': 'the a message',
    },
  }
  beforeEach(() => {
    result = poMessageReader({
      messagesPattern: '**/*.po',
      cwd: 'test/fixtures/po',
    })
  })
  it('should return all messages', () => {
    expect(result).toEqual(expected)
  })
})

