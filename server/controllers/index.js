'use strict';


exports.partials = function() {
  return function(req, res) {
      var name = req.params.name;
      console.log('partialsggg',name);
      res.render('partials/' + name);
  };
};
