# CLI HTML to PDF converter

## About
Just a simple CLI converter based on [html-pdf](https://www.npmjs.com/package/html-pdf)


## Installation
```
$ npm install -g html2pdf-cli
```

## Usage
```
$ html2pdf -h
usage: html2pdf-cli [-h] [-v] -s SOURCES -d DESTINATION [-o OPTIONS]

CLI HTML to PDF converter

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -s SOURCES, --sources SOURCES
                        A file or a glob string. Example: file.html or '*.
                        html'
  -d DESTINATION, --destination DESTINATION
                        A folder. Example: pdf/
  -o OPTIONS, --options OPTIONS
                        html-pdf options. Can be a JSON file or string

```
Example:
```
$ html2pdf -s file.html -d ./pdf  
$ html2pdf -s './path/**/*.html' -d ./pdf -o ./options.json
```

## Options
https://www.npmjs.com/package/html-pdf#options

##Problems?
[Open an Issue](https://github.com/cperezabo/html2pdf-cli/issues)
