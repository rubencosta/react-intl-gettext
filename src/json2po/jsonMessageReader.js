import { join } from 'path'
import { readFileSync } from 'fs'
import { sync as globSync } from 'glob'

export default ({
  messagesPattern = '**/*.json',
  cwd = process.cwd(),
}) => globSync(messagesPattern, { cwd })
  .map(filename => {
    const parsedMessages = JSON.parse(readFileSync(join(cwd, filename), 'utf-8'))
    return ({
      filename,
      messages: Array.isArray(parsedMessages) ? parsedMessages : [],
    })
  })
  .reduce((mappedMessages, { filename, messages }) => ([
    ...mappedMessages,
    ...messages.map(({ id, defaultMessage, description } = {}) => ({
      reference: filename,
      extracted: description,
      ctx: defaultMessage,
      msgid: id,
    })),
  ]), [])
