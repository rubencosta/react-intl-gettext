const escapeString = (str) => str.replace(/"/g, '\\"')

const buildMessage = copyDefaultTranslation => ({
  reference,
  description,
  id,
  defaultMessage,
  translatedMessage,
}) =>
[
  `#. ${description}`,
  `# ${reference}`,
  `msgctxt "${escapeString(id)}"`,
  `msgid "${escapeString(defaultMessage)}"`,
  `msgstr "${copyDefaultTranslation ? escapeString(translatedMessage || defaultMessage) : ''}"`,
  '',
].join('\n')

export default (messages, copyDefaultTranslation, header = '') => {
  const body = messages.map(buildMessage(copyDefaultTranslation)).join('\n')
  return header ? [header, '', body].join('\n') : body
}
