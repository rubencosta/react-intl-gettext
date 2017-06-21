const buildMessage = copyDefaultTranslation => ({
  reference,
  description,
  id,
  defaultMessage,
  translatedMessage,
}) =>
[
  `#. ${description}`,
  `#: ${reference}`,
  `msgctxt "${id}"`,
  `msgid "${defaultMessage}"`,
  `msgstr "${copyDefaultTranslation ? translatedMessage || defaultMessage : ''}"`,
  '',
].join('\n')

export default (messages, copyDefaultTranslation, header = '') => {
  const body = messages.map(buildMessage(copyDefaultTranslation)).join('\n')
  return header ? [header, '', body].join('\n') : body
}
