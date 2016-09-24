// - -------------------------------------------------------------------- - //

module.exports = function() {

  var api = {};
  var parseAPI = require("./src/parse-api.js");
  var renderAPI = require("./src/render-api.js");
  var renderModules = require("./src/render-modules.js");
  var renderIndex = require("./src/render-index.js");
  var compileLESS = require("./src/compile-less.js");
  var listModules = require("./src/list-modules.js");

  return this.Promise
    .print("Build started")
    .then(listModules)
    .then(renderModules)
    .map(function(name) {
      return parseAPI.call(this,name,api);
    })
    .return(api)
    .then(renderAPI)
    .then(renderIndex)
    .then(compileLESS)

    .print("Build finished")
    .exit();
};

// - -------------------------------------------------------------------- - //
