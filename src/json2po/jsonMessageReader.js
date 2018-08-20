import { join } from 'path'
import { readFileSync } from 'fs'
import { sync as globSync } from 'glob'

export default ({ messagesPattern = '**/*.json', cwd = process.cwd(), ignore }) => {
  const ids = new Set()
  return globSync(messagesPattern, { cwd, ignore })
    .map(filename => {
      const parsedMessages = JSON.parse(readFileSync(join(cwd, filename), 'utf-8'))
      return {
        filename,
        messages: Array.isArray(parsedMessages) ? parsedMessages : [],
      }
    })
    .reduce(
      (mappedMessages, { filename, messages }) => [
        ...mappedMessages,
        ...messages.map(
          ({
            id,
            defaultMessage,
            description,
            translatedMessage,
            file = filename,
            start: { line: startLine } = {},
          } = {}) => {
            if (ids.has(id)) {
              throw new Error(`The id ${id} found in ${filename} was already defined`)
            }
            ids.add(id)
            return {
              reference: startLine ? `${file}:startLine` : file,
              description,
              id,
              defaultMessage,
              translatedMessage,
            }
          }
        ),
      ],
      []
    )
}
