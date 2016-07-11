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
          [id]: Object.keys(contexts[id]).shift(),
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
