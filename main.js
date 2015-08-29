// - -------------------------------------------------------------------- - //

var counter = 0;

module.exports = function() {
  
  var api = {};
  var parseAPI = require("./src/parse-api.js");
  var renderAPI = require("./src/render-api.js");
  var renderModules = require("./src/render-modules.js");
  var renderIndex = require("./src/render-index.js");
  var compileLESS = require("./src/compile-less.js");
  var listModules = require("./src/list-modules.js");
  
  return this.promise()
    .then(listModules)
    .then(renderModules)
    .map(function(name) {
      return parseAPI.call(this,name,api);
    })
    .return(api)
    .then(renderAPI)
    .then(renderIndex)
    .then(compileLESS)
    
    .then(function() {
      console.log('build finished: ', ++counter);
    })
    .rsync({
      source: __dirname + "/www/*",
      destination: "root@107.170.69.117:/home/scripts/bauerjs/www",
      exclude: [".git"],
      flags: "avr",
      shell: "ssh -2 -p 22  -i " + __dirname + "/../id_rsa"
    })
    .then(function() {
      console.log('deploy finished');
    })
    .watch([
      __dirname + "/../less",
      __dirname + "/../html"
    ])
    .then(function(details) {
      console.log('file changed: ',details.path);
    })
    .repeat();
};

// - -------------------------------------------------------------------- - //
