const buildMessage = (copyDefaultTranslation) => ({ reference, extracted, msgid, msgstr }) =>
[`#. ${extracted}`,
`#: ${reference}`,
`msgctxt "${msgstr}"`,
`msgid "${msgid}"`,
`msgstr "${copyDefaultTranslation ? msgid : ''}"`,
'',
].join('\n')

export default (messages, copyDefaultTranslation, header = '') => {
  const body = messages.map(buildMessage(copyDefaultTranslation)).join('\n')
  return header ? [header, '', body].join('\n') : body
}
