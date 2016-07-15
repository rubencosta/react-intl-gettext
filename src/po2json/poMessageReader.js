import { sync as globSync } from 'glob'
import { join } from 'path'
import { readFileSync } from 'fs'
import { po } from 'gettext-parser'

const defaultNameMatcher = (filename) => filename.match(/.*[-_\.](.*[-_].*)\.po$/)[1]

export default ({
  messagesPattern = '**/*.po',
  cwd = process.cwd(),
  langMatcher = defaultNameMatcher,
}) => {
  const translations = globSync(messagesPattern, { cwd })
    .map(filename => {
      const { translations: contexts } = po.parse(readFileSync(join(cwd, filename)), 'utf-8')
      const mergedTranslations = Object.keys(contexts)
        .reduce((acc, id) => ({
          ...acc,
          [id]: Object.keys(contexts[id]).reduce((msgstr, nextContextObject, _, array) => {
            if (id !== '' && array.length > 1) {
              throw new Error(`More than one message was found for the context ${id}`)
            }
            if (contexts[id][nextContextObject].msgstr.length > 1) {
              /* eslint-disable no-console */
              console.warn(`Plural definitions were found for the context ${id}. 
              Plurals are ignored!`)
              /* eslint-enable no-console */
            }
            return contexts[id][nextContextObject].msgstr[0]
          }, ''),
        }), {})
      return {
        [langMatcher(filename)]: mergedTranslations,
      }
    })
  return translations.reduce((acc, nextFile) => ({
    ...acc,
    ...nextFile,
  }), {})
}
