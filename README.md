# react-intl-gettext

Integrate react-intl with gettext tools. This package provides a CLI tool to help converting between react-intl JSON files and gettext PO files.

## Installation

```sh
$ npm install react-intl-gettext --save-dev
```
Of course you can use ```yarn add```.

```sh
$ yarn add react-intl-gettext --dev
```

## Example `package.json` usage
```json
scripts: {
  "i18n:extract:json2pot": "rig json2pot ./messages ./translations/my-app.pot",
  "i18n:extract:json2po": "rig json2pot -d en './build/messages/json' ./translations/my-app-en.po",
  "i18n:import": "rig po2json './translations' ./src/assets/translations.json",
}
```

## CLI usage

```sh
 Usage: cli [options] [command]


  Commands:

    json2pot [options] <src> <dest>  converts react-intl extracted json to po/pot
    po2json [options] <src> <dest>   converts po files to json

  Options:

    -h, --help  output usage information
```
### Commands usage
#### `json2pot [options] <src> <dest>`  converts react-intl extracted json to po/pot

```sh
  Usage: json2pot [options] <src> <dest>

  converts react-intl extracted json to po/pot

  Options:

    -h, --help                      output usage information
    -p, --pattern [pattern]         glob pattern used to find the src files [**/*.json]
    -d, --use-default <lang>        use defaultMessage as msgstr and use <lang> as value for Language header field
    -i, --ignore <patterns>         add a pattern or an array of glob patterns to exclude matches
    --project-id-version [version]  set the value of Project-Id-Version header field [my-app 1.0.0]
    --report-msgid-bugs-to [url]    set the value of Report-Msgid-Bugs-to header field [http://myapp.example.com]
```

#### `po2json [options] <src> <dest>`   converts po files to json

```sh
Usage: po2json [options] <src> <dest>

  converts po files to json

  Options:

    -h, --help               output usage information
    -p, --pattern [pattern]  glob pattern used to find the src files [**/*.po]
    --pretty                 pretty print json
    -i, --ignore <patterns>  add a pattern or an array of glob patterns to exclude matches
```
