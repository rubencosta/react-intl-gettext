export default (messages, copyDefaultTranslation) => messages.map(
  ({ reference, extracted, msgid, msgstr }) =>
    `#. ${extracted}\n#: ${reference}\nmsgctxt "${msgstr}"\nmsgid "${msgid}"\nmsgstr "${
      copyDefaultTranslation ? msgid : ''
      }"\n`
).join('\n')
