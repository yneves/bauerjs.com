// - -------------------------------------------------------------------- - //

module.exports = function() {
    
  return this.promise()
    .render(__dirname + "/../html/layout.html",{
      target: __dirname + "/../www/index.html",
      values: { 
        active: "start",
        index: "start",
        menu: ["start","api","modules"],
      }
    });
};

// - -------------------------------------------------------------------- - //
