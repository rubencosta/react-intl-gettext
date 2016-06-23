export default (messages, copyDefaultTranslation) => messages.map(
  ({ reference, extracted, msgid, msgstr }) =>
    `#. ${extracted}\n#: ${reference}\nmsgid "${msgid}"\nmsgstr "${
      copyDefaultTranslation ? msgstr : ''
      }"\n`
).join('\n')
