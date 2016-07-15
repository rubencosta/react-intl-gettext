import { join } from 'path'
import { readFileSync } from 'fs'
import { sync as globSync } from 'glob'

export default ({
  messagesPattern = '**/*.json',
  cwd = process.cwd(),
}) => {
  const ids = new Set()
  return globSync(messagesPattern, { cwd })
    .map(filename => {
      const parsedMessages = JSON.parse(readFileSync(join(cwd, filename), 'utf-8'))
      return ({
        filename,
        messages: Array.isArray(parsedMessages) ? parsedMessages : [],
      })
    })
    .reduce((mappedMessages, { filename, messages }) => ([
      ...mappedMessages,
      ...messages.map(({ id, defaultMessage, description } = {}) => {
        if (ids.has(id)) {
          throw new Error(`The id ${id} found in ${filename} was already defined`)
        }
        ids.add(id)
        return ({
          reference: filename,
          extracted: description,
          msgstr: id,
          msgid: defaultMessage,
        })
      }),
    ]), [])
}
