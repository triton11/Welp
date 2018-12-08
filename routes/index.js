var express = require('express');
var router = express.Router();
var path = require('path');
const request = require('request');
// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
	// host     : 'cis550database.cxnfzuvlc8uv.us',
	host     : 'cis550database.cxnfzuvlc8uv.us-east-1.rds.amazonaws.com',
	user     : 'monandtris',
	password : 'trisandmon',
	database : ''
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// router.get('/reference', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
// });

// router.get('/insert', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
// });

// router.get('/friends', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'friends.html'));
// });

// router.get('/family', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'family.html'));
// });

// router.get('/data/:email', function(req,res) {
// 	// use console.log() as print() in case you want to debug, example below:
// 	var email = req.params.email;
// 	var query = 'SELECT * FROM Person p WHERE p.login = \'' + email + '\'';
// 	// note that email parameter in the request can be accessed using "req.params.email"
// 	console.log(query);
// 	connection.query(query, function(err, rows, fields) {
// 		if (err) console.log(err);
// 		else {
// 				if (rows.length == 0) {
// 					var query = 'SELECT * FROM Person p';
// 					console.log(query);
// 					connection.query(query, function(err, rows, fields) {
// 						if (err) console.log(err);
// 						else {
// 								res.json(rows);
// 						}  
// 						});
// 				} else {
// 					res.json(rows);
// 				}
// 		}  
// 		});
// });

// router.get('/data', function(req,res) {
//   var query = 'SELECT * FROM Person p';
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//         res.json(rows);
//     }  
//   });
// });

// ----Your implemention of route handler for "Insert a new record" should go here-----
router.get('/data/:city/data/:budget/data/:timeStart/data/:timeEnd/data/:day/data/:occassion', function(req,res) {
	// use console.log() as print() in case you want to debug, example below:
	// console.log(req.parms.email);
	var city = req.params.city;
	var budget = req.params.budget;
	var timeStart = req.params.timeStart;
	var timeEnd = req.params.timeEnd;
	var day = req.params.day;
	var occassion = req.params.occassion;
	console.log(city + "\t" + budget + "\t" + timeStart + "\t" + timeEnd + "\t" + day + "\t" + occassion);
	var query = 'SELECT * FROM welp.Businesses wb WHERE wb.city = \'' + city + '\' AND wb.stars ' +
	'>= 4 LIMIT 25';
	console.log(query);
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
				// res.json(rows);
			for (var i = 0; i < rows.length; i++) {
					// var query = 'SELECT * FROM welp.Businesses LIMIT 10';
					// console.log(query);
				var business_id = rows[i].business_id;
				var row = rows[i];

				var yelpAPIreq = 'https://api.yelp.com/v3/businesses/'+ business_id;
				// console.log(yelpAPIreq);
				request(yelpAPIreq, { json: true, auth: { 'bearer': 'cxwKkcHwsJ6oQlEZnVpQetfw92Thwx6ebJ7wuclQLPB7AOqStUXyLTYoSK1T2qzcQg2CT8IZt00K5HjdC2Twi2osjB8CEW-i081iVgEKi4FHuZGB3AJDqyvt9ywMXHYx'}}, 
				(err, result, body) => {
					if (err) { return console.log(err); }
					if (result.body.price != "undefined" && result.body.price === budget) {
						console.log(result.body.price + "\t" + budget);
						console.log(row);
						// res.json(row);
						res.send(row);
					}
						// console.log(res.body);
						// if constraints met, break
				});
			} 
		}  
		});
	});

	// connection.query(query, function(err, rows, fields) {
	//   if (err) console.log(err);
	//   else {
	//       if (rows.length == 0) {
	//         var query = 'SELECT * FROM welp.Businesses LIMIT 10';
	//         console.log(query);
	//         connection.query(query, function(err, rows, fields) {
	//           if (err) console.log(err);
	//           else {
	//               res.json(rows);
	//           }  
	//           });
	//       } else {
	//         res.json(rows);
	//       }
	//   }  
	//   });
// });

// router.get('/friends/:email', function(req,res) {
//   // use console.log() as print() in case you want to debug, example below:
//   // console.log(req.parms.email);
//   var email = req.params.email;
//   var query = '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthyear ' + 
//   'FROM Friends f JOIN Person p ON f.friend = p.login ' +
//   'WHERE f.login = \'' + email + '\') ' + 
//   'UNION ' + 
//   '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthYear ' + 
//   'FROM Family f JOIN Friends fr ON f.member = fr.login ' + 
//   'JOIN Person p ON fr.friend = p.login ' + 
//   'WHERE f.login = \'' + email + '\' ' + 
//   'AND fr.friend != \'' + email + '\')';
//   // '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthyear ' +
//   // 'FROM Family f JOIN Person p ON f.member = p.login ' + 
//   // 'WHERE f.login = \'' + email + '\' AND f.member != \'' + email + '\') ' +
//   // 'UNION ' +
//   // '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthyear ' +
//   // 'FROM Family f JOIN Person p ON f.login = p.login ' + 
//   // 'WHERE f.member = \'' + email + '\' AND f.login != \'' + email + '\') ';
//   // note that email parameter in the request can be accessed using "req.params.email"
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//         res.json(rows);
//     }  
//     });
// });

// router.get('/family/:email', function(req,res) {
// 	// use console.log() as print() in case you want to debug, example below:
// 	// console.log(req.parms.email);
// 	var email = req.params.email;
// 	var query = '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthyear ' + 
// 	'FROM Family f JOIN Person p ON f.member = p.login ' +
// 	'WHERE f.login = \'' + email + '\') ';
// 	// note that email parameter in the request can be accessed using "req.params.email"
// 	console.log(query);
// 	connection.query(query, function(err, rows, fields) {
// 		if (err) console.log(err);
// 		else {
// 				res.json(rows);
// 		}  
// 		});
// });

// router.get('/load/', function(req,res) {
//   var query = 'SELECT DISTINCT f.login FROM Family f';
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }  
//   });
// });



module.exports = router;