"use strict";

if (!process.argv[2]) {
  console.log('No shared directory provided with argv.');
  process.exit(0);
}

var _ = require('underscore');
var express = require('express');
var path = require('path');
var fs = require('fs');

var sharedDirectory = path.resolve(process.argv[2]);

var app = express();

app.set('view engine', 'jade');
app.use('/file', express.static(sharedDirectory));

app.get('/', function (req, res) {
  res.redirect('/file');
});

app.get(/^\/file(.*)/, function (req, res) {
  var dir = req.params[0];
  if (!dir || dir === '') {
    dir = '/';
  }
  if (dir[dir.length - 1] !== '/') {
    dir += '/';
  }
  var absoluteDir = path.join(sharedDirectory, dir);
  var parentPath = dir === '/' ? null : path.dirname(dir);

  if (!fs.lstatSync(absoluteDir).isDirectory()) {
    res.send(404, 'Not found...');
    return;
  }

  fs.readdir(absoluteDir, function (err, files) {
    files = _.reduce(files, function (result, fileName) {
      if (fileName[0] === '.') {
        // Hidden file.
        return result;
      }

      var filePath = path.join(absoluteDir, fileName);
      var fileStat = fs.lstatSync(filePath);

      if (fileStat.isDirectory()) {
        result.dirs.push(fileName);
      }
      if (fileStat.isFile()) {
        result.files.push(fileName);
      }

      return result;
    }, {dirs: [], files: []});

    res.render('file', {
      parentPath: parentPath,
      path: dir,
      files: files
    });
  });
});

app.listen(8080);
