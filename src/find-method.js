// - -------------------------------------------------------------------- - //

var fs = require("fs");
var path = require("path");
var fileContent = {};

module.exports = function(mod,method) {
  
  var fileMethod = [];
  
  return this.promise()
    .glob(mod + "/lib/*.js")
    .each(function(filepath) {
    
      return this.promise()
        .extract(filepath,{ lines: true })
        .then(function(lines) {
          
          var lineNumber = -1;
          lines.forEach(function(line,index) {
            if (line.indexOf(method) > -1) {
              lineNumber = index + 1;
            }
          });
          fileMethod[filepath] = {
            repo: path.basename(mod),
            file: "/lib/" + path.basename(filepath),
            line: lineNumber
          };
          
          return filepath;
        });
    })
    .then(function(files) {
      return files.map(function(file) {
        return fileMethod[file];
      }).filter(function(file) {
        return file.line > -1;
      });
    });
};
// - -------------------------------------------------------------------- - //
