var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = "postgres://hirochi:123456@localhost:5432/easycoleto";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
	res.render('about', { title: 'about' });
});

router.get('/contact', function(req, res, next) {
	res.render('contact');
});

router.post('/contact', function(req, res, next) {
	var elements = [];
	if (req.body.name === '' || req.body.name === undefined) {
		req.body.name = 'no name';
	};
	pg.connect(connection, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		};

		var query = client.query('INSERT INTO "easy-coleto-web".contacs (name, email, message) VALUES($1, $2, $3)', [req.body.name, req.body.email, req.body.message]);
		query.on('end',  function(){
			done();
			return res.send('ok');
		});
	});
});

module.exports = router;