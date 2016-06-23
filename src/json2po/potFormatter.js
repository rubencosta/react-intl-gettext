export default (messages, copyDefaultTranslation) => messages.map(
  ({ reference, extracted, ctx, msgid }) =>
    `#. ${extracted}\n#: ${reference}\nmsgctxt "${ctx}"\nmsgid "${msgid}"\nmsgstr "${
      copyDefaultTranslation ? ctx : ''
      }"\n`
).join('\n')
