// - -------------------------------------------------------------------- - //

module.exports = function(modules) {
      
  var mods = modules.map(function(name) {
    var pkg = require(__dirname + "/../../" + name + "/package.json");
    return {
      name: name.substr(5),
      git: name,
      npm: name.substr(5),
      version: pkg.version,
      description: pkg.description
    }
  });
  
  var plugins = mods.filter(function(mod) {
    return /^bauer-plugin/.test(mod.name);
  });
  
  var core = mods.filter(function(mod) {
    return /crawler|cluster|cli/.test(mod.name);
  });
  
  var utils = mods.filter(function(mod) {
    return !/plugin|crawler|cluster|cli/.test(mod.name);
  });
      
  return this.Promise
    .render(__dirname + "/../html/layout.html",{
      target: __dirname + "/../www/modules.html",
      values: { 
        active: "modules",
        index: "start",
        menu: ["start","api","modules"],
        core: core,
        plugins: plugins,
        utils: utils,
        github: "https://github.com/yneves/",
        npm: "https://www.npmjs.com/package/"
      }
    })
    .return(modules);
};

// - -------------------------------------------------------------------- - //
