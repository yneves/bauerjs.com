// - -------------------------------------------------------------------- - //

var fs = require("fs");
var less = require("less");

module.exports = function() {

  return this.Promise
    .extract(__dirname + "/../less/style.less",{ raw: true })
    .then(function(content) {
      return new this.Promise(function(resolve,reject) {
        less.render(content, { paths: [__dirname + "/../less"] }, function (error, output) {
          if (!error) {
            fs.writeFile(__dirname + "/../www/style.css",output.css,function(error) {
              if (error) {
                reject(error);
              } else {
                resolve(output.css);
              }
            });
          }
        });
      }).bind(this);
    });
};

// - -------------------------------------------------------------------- - //
