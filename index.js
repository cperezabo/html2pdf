#!/usr/bin/env node

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  through = require('through2'),
  pdf = require('html-pdf'),
  logger = require('gulp-logger'),
  ArgumentParser = require('argparse').ArgumentParser,
  fs = require("fs");

var parser = new ArgumentParser({
  version: require('./package.json').version,
  addHelp: true,
  description: require('./package.json').description
});
parser.addArgument(
  ['-s', '--sources'],
  {
    help: 'A file or a glob string. Example: file.html or \'*.html\'',
    required: true
  }
);
parser.addArgument(
  ['-d', '--destination'],
  {
    help: 'A folder. Example: pdf/',
    required: true
  }
);
parser.addArgument(
  ['-o', '--options'],
  {
    help: 'html-pdf options. Can be a JSON file or string'
  }
);

var args = parser.parseArgs();

if (args.options) {
  if (fs.existsSync(args.options) && fs.statSync(args.options).isFile()) {
    args.options = require(args.options)
  } else {
    args.options = JSON.parse(args.options);
  }
}

gulp.src(args.sources)
  .pipe(function (options) {
    return through.obj(function (file, enc, cb) {
      pdf.create(file.contents.toString(), options)
        .toBuffer(function (err, buffer) {
          if (err) {
            cb(new gutil.PluginError('pdfWalker', err, {fileName: file.path}));
            return;
          }

          file.contents = buffer;
          file.path = gutil.replaceExtension(file.path, '.pdf');
          cb(null, file);
        });
    });
  }(args.options))
  .pipe(logger({
    before: 'Generating...',
    after: 'Done!'
  }))
  .pipe(gulp.dest(args.destination));
