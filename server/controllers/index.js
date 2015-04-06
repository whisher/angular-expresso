'use strict';


exports.partials = function() {
  return function(req, res) {
      var name = req.params.name;
      res.render('partials/' + name);
  };
};
