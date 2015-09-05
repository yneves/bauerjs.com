// - -------------------------------------------------------------------- - //

var findMethod = require("./find-method.js");

module.exports = function(name,api) {
  
  var mod = __dirname + "/../../" + name;
  
  return this.Promise.extract(mod + "/README.md", /## API Summary([^#]+)#/)
    .then(function(text) {
      
      var lines = text && text[0] ? text[0].split(/\n/) : [];
      var promises = [];
      var cls;
      
      lines.forEach(function(line) {
        var index = line.indexOf('*');
        if (index > -1) {
          line = line.replace(/^ *\* *\`|\`$/g,"");
          if (index === 2) {
            cls = line;
            if (!api[cls]) {
              api[cls] = [];
            }
          } else if (index === 4) {
            if (cls) {
              var method = {
                signature: line
              };
              api[cls].push(method);
              var promise = findMethod.call(this,mod,line).then(function(files) {
                method.files = files;
              });
              promises.push(promise);
            }
          }
        }
      }.bind(this));
      
      return this.Promise.all(promises);
    });
};
// - -------------------------------------------------------------------- - //
