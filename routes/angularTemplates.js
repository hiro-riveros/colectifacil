var express = require('express');
var router = express.Router();

/* GET ANGULARTEMPLATES DYNAMIC ROUTES. */
router.get('/', function(req, res, next) {
	console.log(req.query.page);
  res.render(req.query.page);
});

module.exports = router;