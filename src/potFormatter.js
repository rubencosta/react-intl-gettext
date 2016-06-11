export default (messages) => messages
  .map(
    ({ reference, extracted, ctx, msgid }) =>
      `#. ${extracted}\n#: ${reference}\nmsgctxt "${ctx}"\nmsgid "${msgid}"\nmsgstr ""\n`
  )
  .join('\n')
