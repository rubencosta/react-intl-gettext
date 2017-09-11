import { sync as globSync } from 'glob'
import { join } from 'path'
import { readFileSync } from 'fs'
import { po } from 'gettext-parser'

const newNameMatcher = regex => filename => filename.match(regex)[1]

export const defaultNameMatcherPatternString = '.*-(.*)\\.po$'
export const defaultPattern = '**/*.po'

export default ({
  messagesPattern = defaultPattern,
  cwd = process.cwd(),
  langMatcherPattern = defaultNameMatcherPatternString,
  langMatcher = newNameMatcher(langMatcherPattern),
  ignore,
}) => {
  const translations = globSync(messagesPattern, { cwd, ignore }).map(filename => {
    const { translations: contexts } = po.parse(readFileSync(join(cwd, filename)), 'utf-8')
    const mergedTranslations = Object.keys(contexts).filter(id => id !== '').reduce(
      (acc, id) => ({
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
      }),
      {}
    )
    return {
      [langMatcher(filename)]: mergedTranslations,
    }
  })
  return translations.reduce(
    (acc, nextFile) => ({
      ...acc,
      ...nextFile,
    }),
    {}
  )
}
