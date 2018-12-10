var express = require('express');
var router = express.Router();
var path = require('path');
// const request = require('request');
// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
	// host     : 'cis550database.cxnfzuvlc8uv.us',
	host     : 'cis550database.cxnfzuvlc8uv.us-east-1.rds.amazonaws.com',
	user     : 'monandtris',
	password : 'trisandmon',
	database : ''
});


router.use(express.static(path.join(__dirname, '../', 'views')));
/* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
// });

// router.get('/proposal', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'proposal.html'));
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

router.get('/update/:city/:timeStart/:timeEnd/:day/:occassion', function(req,res) {

	var city = req.params.city;
	var timeStart = req.params.timeStart;
	var timeEnd = req.params.timeEnd;
	var totalTime = timeEnd - timeStart;
	var day = req.params.day;
	var occassion = req.params.occassion;
	var query = '(SELECT * FROM welp.Businesses wb JOIN welp.Hours wh ON wb.business_id = wh.business_id WHERE wb.city = \'' + city + '\' AND wh.'+day+'_start <= "8:00" AND wh.'+day+'_end >= "12:00" AND wb.categories LIKE "%' + occassion + '%" LIMIT 25)';
	//console.log(query);
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			res.json(rows);
		}
	});
});


// ----Your implemention of route handler for "Insert a new record" should go here-----
router.get('/data/:city/:timeStart/:timeEnd/:day/:occassion/:breakfast/:lunch/:dinner', function(req,res) {
	// use console.log() as print() in case you want to debug, example below:
	// console.log(req.parms.email);
	var city = req.params.city;
	var timeStart = req.params.timeStart;
	var timeEnd = req.params.timeEnd;
	var totalTime = timeEnd - timeStart;
	var day = req.params.day;
	var occassion = req.params.occassion;
	var breakfast = req.params.breakfast;
	var lunch = req.params.lunch;
	var dinner = req.params.dinner;
	var activityNumber = 0;
	var query = '';
	console.log(totalTime);
	if (breakfast) {
		totalTime = totalTime - 2;
		query = '(SELECT * FROM welp.Businesses wb JOIN welp.Hours wh ON wb.business_id = wh.business_id WHERE wb.city = \'' + city + '\' AND wh.'+day+'_start <= "8:00" AND wh.'+day+'_end >= "12:00" AND wb.categories LIKE "%Breakfast & Brunch%" LIMIT 1)';
	}
	if (lunch == true && dinner == true) {
		if (query != "") {
			query += " UNION "
		}
		totalTime = totalTime - 4;
		query += '(SELECT * FROM welp.Businesses wb JOIN welp.Hours wh ON wb.business_id = wh.business_id WHERE wb.city = \'' + city + '\' AND wh.'+day+'_start <= "12:00" AND wh.'+day+'_end >= "12:00" AND wb.categories LIKE "%Restaurants%" AND wb.categories NOT LIKE "%Breakfast & Brunch%" LIMIT 2)';
	} else if (lunch == true || dinner == true) {
		if (query != "") {
			query += " UNION "
		}
		totalTime = totalTime - 2;
		query += '(SELECT * FROM welp.Businesses wb JOIN welp.Hours wh ON wb.business_id = wh.business_id WHERE wb.city = \'' + city + '\' AND wh.'+day+'_start <= "12:00" AND wh.'+day+'_end >= "12:00" AND wb.categories LIKE "%Restaurants%" AND wb.categories NOT LIKE "%Breakfast & Brunch%" LIMIT 1)';
	}
	if (totalTime > 2) {
		if (query != "") {
			query += " UNION "
		}
		limit = Math.floor(totalTime/3);
		query += '(SELECT * FROM welp.Businesses wb JOIN welp.Hours wh ON wb.business_id = wh.business_id WHERE wb.city = \'' + city + '\' AND wb.categories LIKE "%' + occassion + '%" LIMIT ' + limit + ')';
	}
	console.log(query);
	//console.log(city + "\t" + budget + "\t" + timeStart + "\t" + timeEnd + "\t" + day + "\t" + occassion);
	
	//var query = 'SELECT * FROM welp.Businesses wb WHERE wb.city = \'' + city + '\' AND wb.stars ' +
	//'>= 4 LIMIT 25';
	//console.log(query);
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			res.json(rows);
			// for (var i = 0; i < rows.length; i++) {
			// 		// var query = 'SELECT * FROM welp.Businesses LIMIT 10';
			// 		// console.log(query);
			// 	var business_id = rows[i].business_id;
			// 	var row = rows[i];

			// 	var yelpAPIreq = 'https://api.yelp.com/v3/businesses/'+ business_id;
			// 	// console.log(yelpAPIreq);
			// 	request(yelpAPIreq, { json: true, auth: { 'bearer': 'cxwKkcHwsJ6oQlEZnVpQetfw92Thwx6ebJ7wuclQLPB7AOqStUXyLTYoSK1T2qzcQg2CT8IZt00K5HjdC2Twi2osjB8CEW-i081iVgEKi4FHuZGB3AJDqyvt9ywMXHYx'}}, 
			// 	(err, result, body) => {
			// 		if (err) { return console.log(err); }
			// 		if (result.body.price != "undefined" && result.body.price === budget) {
			// 			console.log(result.body.price + "\t" + budget);
			// 			console.log(row);
			// 			// res.json(row);
			// 			if (!res.headersSent) {
			// 				res.json(row);
			// 			}
			// 		}
			// 			// console.log(res.body);
			// 			// if constraints met, break
			// 	});
			// } 
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