import { readFileSync } from 'fs'
import { sync as globSync } from 'glob'

export default (messagesPattern = '**/*.json', { cwd = '' }) => globSync(messagesPattern, { cwd })
  .map(
    filename => ({
      filename,
      messages: JSON.parse(readFileSync(`${cwd}/${filename}`, 'utf-8')),
    })
  )
  .reduce(
    (mappedMessages, { filename, messages }) => ([
      ...mappedMessages,
      ...messages
        .map(
          ({ id, defaultMessage, description }) => ({
            reference: filename,
            extracted: description,
            ctx: id,
            msgid: defaultMessage,
          })
        ),
    ]),
    [],
  )
