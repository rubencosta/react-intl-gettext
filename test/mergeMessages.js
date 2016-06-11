/* eslint-env mocha */

import expect from 'expect'
import mergeMessages from '../src/mergeMessages'

describe('map messages', () => {
  let result
  const mergedMessages = [
    {
      ctx: 'a.a',
      reference: 'src_test/moduleA.json',
      extracted: 'a message of the a module',
      msgid: 'the a message',
    },
    {
      ctx: 'a.b',
      reference: 'src_test/moduleA.json',
      extracted: 'b message of the a module',
      msgid: 'the b message',
    },
    {
      ctx: 'a.c',
      reference: 'src_test/moduleA.json',
      extracted: 'c message of the a module',
      msgid: 'the a message',
    },
    {
      ctx: 'b.a',
      reference: 'src_test/moduleB.json',
      extracted: 'a message of the b module',
      msgid: 'the a message',
    },
    {
      ctx: 'b.b',
      reference: 'src_test/moduleB.json',
      extracted: 'b message of the b module',
      msgid: 'the b message',
    },
    {
      ctx: 'b.c',
      reference: 'src_test/moduleB.json',
      extracted: 'c message of the b module',
      msgid: 'the a message',
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

