/* eslint-env mocha */

import expect from 'expect'
import formatHeader from '../src/json2po/headerFormatter'
import pkg from '../package.json'

describe('header formatter', () => {
  let result
  let formattedHeader
  const options = {
    projectIdVersion: 'Example Project 1.2.3',
    reportMsgidBugsTo: 'http://example.com',
  }
  const language = 'en_US'

  context('without language', () => {
    beforeEach(() => {
      formattedHeader = `\
msgid ""
msgstr ""
"Project-Id-Version: ${options.projectIdVersion}\\n"
"Report-Msgid-Bugs-To: ${options.reportMsgidBugsTo}\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"Last-Translator: Automatically generated\\n"
"Language-Team: none\\n"
"X-Generator: ${pkg.name} ${pkg.version}\\n"`
      result = formatHeader(options)
    })
    it('should print a correctly formatted header', () => {
      expect(result).toMatch(formattedHeader)
    })
  })
  context('with language', () => {
    beforeEach(() => {
      formattedHeader = `\
msgid ""
msgstr ""
"Project-Id-Version: ${options.projectIdVersion}\\n"
"Report-Msgid-Bugs-To: ${options.reportMsgidBugsTo}\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"Last-Translator: Automatically generated\\n"
"Language-Team: none\\n"
"X-Generator: ${pkg.name} ${pkg.version}\\n"
"Language: ${language}\\n"`
      result = formatHeader({
        ...options,
        language,
      })
    })
    it('should print a correctly formatted header', () => {
      expect(result).toInclude(`"Language: ${language}\\n"`)
    })
  })
})
