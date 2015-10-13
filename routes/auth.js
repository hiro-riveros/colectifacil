/* 
==============================================
	TO-DO ADD PASSENGER TO SIGNIN AND SIGNUP
==============================================
*/

var express = require('express');
var router = express.Router();

/* SESSION DEPENDENCIES */
// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
// var methodOverride = require('method-override');
// var session = require('express-session');

var pg = require('pg');
var connection = "postgres://hirochi:123456@localhost:5432/easycoleto";

/* SIGNUP ACTIONS. */
router.post('/signup', function(req, res, next) {
	if (req.body.email === '' || req.body.email === undefined || 
			req.body.firstName === '' || req.body.firstName === undefined ||
			req.body.lastName === '' || req.body.lastName === undefined ||
			req.body.age === '' || req.body.age === undefined ||
			req.body.address === '' || req.body.address === undefined ||
			req.body.password === '' || req.body.password === undefined ||
			req.body.passwordConfirm === '' || req.body.passwordConfirm === undefined) {
		return console.error('some parameters are invalid!');
	} else if (req.body.password !== req.body.passwordConfirm === undefined) {
		return console.error('password invalid!');
	}	else{
		try{
			pg.connect(connection, function(err, client, done) {
				if (err) {
					return console.error('error fetching client from pool', err);
				};

				var query = client.query('INSERT INTO "easy-coleto-web".users (first_name, last_name, address, age, password, password_confirm, email) VALUES($1, $2, $3, $4, $5, $6, $7)',
				 [req.body.firstName, req.body.lastName, req.body.address, req.body.age, req.body.password, req.body.passwordConfirm, req.body.email]);
				query.on('end',  function(){
					done();
					return res.send('ok');
					next();
				});
			});			
		} catch(e){
			console.error('error: ', e.message);
		}
	};
});






// router.post('/', function(req, res, next) {
// 	var elements = [];

// 	pg.connect(connection, function(err, client, done) {
// 		if (err) {
// 			return console.error('error fetching client from pool', err);
// 		};
// 		client.query('SELECT id, first_name, last_name, address, age FROM "easy-coleto-web".users WHERE email="'+ req.body.email + '" AND password="' + req.body.password +'"',
// 		 function(err, result) {
// 				done();
// 				if (err) {
// 					return console.error('error running query', err);
// 				};
// 				if (result !== undefined || result.length > 0) {
// 					// resolve(result.rows);
// 					var data = result.rows;
// 					data.forEach(function(row, index){
// 						elements.push({ 
// 							'id': row.id, 
// 							'firstName': row.first_name, 
// 							'lastName': row.last_name,
// 							'email': row.email,
// 							'address': row.address,
// 							'age': row.age
// 						});
// 					});
// 					console.log(elements);
// 					res.statusCode = 200;
// 					res.send(elements);
// 				} else {
// 					console.error('error bitches');
// 				};
// 		});
// 	});
// });


module.exports = router;