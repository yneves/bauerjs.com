// - -------------------------------------------------------------------- - //

module.exports = function(api) {

  return this.Promise
    .render(__dirname + "/../html/layout.html",{
      target: __dirname + "/../www/api.html",
      values: { 
        active: "api",
        index: "start",
        menu: ["start","api","modules"],
        api: api,
        github: "https://github.com/yneves/",
        dir: "/blob/master"
      }
    });
};

// - -------------------------------------------------------------------- - //
