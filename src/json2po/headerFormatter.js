import libPkg from '../../package.json'
import { buildVersionFromPackageJson } from '../utils'

const getHeader = () => ['msgid ""', 'msgstr ""'].join('\n')
const getHardcodedFields = () =>
[
  '"MIME-Version: 1.0\\n"',
  '"Content-Type: text/plain; charset=UTF-8\\n"',
  '"Content-Transfer-Encoding: 8bit\\n"',
  '"Last-Translator: Automatically generated\\n"',
  '"Language-Team: none\\n"',
].join('\n')

const getProjectIdVersion = version =>
  `"Project-Id-Version: ${version}\\n"`
const getReportMsgidBugsTo = url =>
  `"Report-Msgid-Bugs-To: ${url}\\n"`
const getXgenerator = version => `"X-Generator: ${version}\\n"`
const getCreationDate = dateString => `"POT-Creation-Date: ${dateString}\\n"`
const getRevisionDate = dateString => `"PO-Revision-Date: ${dateString}\\n"`
const getLanguage = langCode => `"Language: ${langCode}\\n"`

export default ({ projectIdVersion, reportMsgidBugsTo, language }) => {
  const nowISODateTime = new Date().toISOString()
  const lines = [
    getHeader(),
    getProjectIdVersion(projectIdVersion),
    getReportMsgidBugsTo(reportMsgidBugsTo),
    getHardcodedFields(),
    getXgenerator(buildVersionFromPackageJson(libPkg)),
    getCreationDate(nowISODateTime),
    getRevisionDate(nowISODateTime),
  ]
  if (language) {
    lines.push(getLanguage(language))
  }
  return lines.join('\n')
}
