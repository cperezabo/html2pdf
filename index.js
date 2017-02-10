#!/usr/bin/env node

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  through = require('through2'),
  pdf = require('html-pdf'),
  logger = require('gulp-logger'),
  ArgumentParser = require('argparse').ArgumentParser,
  fs = require("fs");

var args = process.argv.slice(2)

if(args.length >= 2) {
    options = {}

    if(args[2]) {
        options = require(args[2])
    }

    html2pdf(args[0], args[1], options)
} else {
    help()
}

function help() {
    var help = [
        'Usage: html2pdf <src> <dest> <options-file>',
        'e.g.:',
        'html2pdf file.html ./pdf',
        'html2pdf ./path/**/*.html ./pdf ../options.json'
    ].join('\n')

    console.log(help)
}

function html2pdf(src, dest, options) {
    gulp.src(src)
        .pipe(pdf(options))
        .pipe(logger({
            before: 'Generating...',
            after: 'Done!'
        }))
        .pipe(gulp.dest(dest))
}
