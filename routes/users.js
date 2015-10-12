var express = require('express');
var router = express.Router();
var pg = require('pg');
var connection = "postgres://hirochi:123456@localhost:5432/easycoleto";


/* GET /users . */
router.get('/', function(req, res, next) {
	var elements = [];
	pg.connect(connection, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		};
		client.query('SELECT id, first_name, last_name, address, age FROM "easy-coleto-web".users', function(err, result) {
			done();
			if (err) {
				return console.error('error running query', err);
			};
			if (result !== undefined || result.length > 0) {
				var data = result.rows;
				data.forEach(function(row, index){
					elements.push({ 
						'id': row.id, 
						'firstName': row.first_name, 
						'lastName': row.last_name,
						'email': row.email,
						'address': row.address,
						'age': row.age
					});
				});
				console.log(elements);
				res.statusCode = 200;
				res.send(elements);
			} else {
				console.error('error bitches');
			};
		});
	});
});

/* GET /users/1 . */
router.get('/:userId', function(req, res, next) {
	var elements = [];
	pg.connect(connection, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		};
		client.query('SELECT id, first_name, last_name, address, age FROM "easy-coleto-web".users WHERE id=' + req.params.userId, 
			function(err, result) {
				done();
				if (err) {
					return console.error('error running query', err);
				};
				if (result !== undefined || result.length > 0) {
					var data = result.rows;
					data.forEach(function(row, index){
						elements.push({ 
							'id': row.id, 
							'firstName': row.first_name, 
							'lastName': row.last_name,
							'email': row.email,
							'address': row.address,
							'age': row.age
						});
					});
					res.statusCode = 200;
					res.send(elements);
				} else {
					console.error('error bitches');
				};
		});
	});
});




module.exports = router;
