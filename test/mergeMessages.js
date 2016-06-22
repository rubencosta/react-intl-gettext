/* eslint-env mocha */

import expect from 'expect'
import mergeMessages from '../src/mergeMessages'

describe('map messages', () => {
  let result
  const mergedMessages = [
    {
      ctx: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'a message of the a module',
      msgid: 'a.a',
    },
    {
      ctx: 'the b message',
      reference: 'src_test/moduleA.json',
      extracted: 'b message of the a module',
      msgid: 'a.b',
    },
    {
      ctx: 'the a message',
      reference: 'src_test/moduleA.json',
      extracted: 'c message of the a module',
      msgid: 'a.c',
    },
    {
      ctx: 'the a message',
      reference: 'src_test/moduleB.json',
      extracted: 'a message of the b module',
      msgid: 'b.a',
    },
    {
      ctx: 'the b message',
      reference: 'src_test/moduleB.json',
      extracted: 'b message of the b module',
      msgid: 'b.b',
    },
    {
      ctx: 'the a message',
      reference: 'src_test/moduleB.json',
      extracted: 'c message of the b module',
      msgid: 'b.c',
    },
  ]
  beforeEach(() => {
    result = mergeMessages('**/*.json', {
      cwd: 'test/fixtures/messages',
    })
  })
  it('should map all messages', () => {
    expect(result).toEqual(mergedMessages)
  })
})

