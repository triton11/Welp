var express = require('express');
var router = express.Router();
var path = require('path');

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

router.get('/data/:email', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  var email = req.params.email;
  var query = 'SELECT * FROM Person p WHERE p.login = \'' + email + '\'';
  // note that email parameter in the request can be accessed using "req.params.email"
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        if (rows.length == 0) {
          var query = 'SELECT * FROM Person p';
          console.log(query);
          connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                res.json(rows);
            }  
            });
        } else {
          res.json(rows);
        }
    }  
    });
});

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
router.get('/data/:login/data/:name/data/:sex/data/:RelationshipStatus/data/:Birthyear', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.parms.email);
  var login = req.params.login;
  var name = req.params.name;
  var sex = req.params.sex;
  var relationship = req.params.RelationshipStatus;
  // var birth = req.params.Birthyear;
  var query = 'SELECT * FROM welp.Businesses LIMIT 10';
  // var query = 'INSERT INTO Person VALUES(\''+login+'\', \''+name+'\', \''+sex+'\', \''+relationship+'\', '+birth+')';
  // var query = 'INSERT INTO Person VALUES('awest@gmail.com', 'Ashton Westad', 'male', 'relationship', 1989)';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
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
});

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
//   // use console.log() as print() in case you want to debug, example below:
//   // console.log(req.parms.email);
//   var email = req.params.email;
//   var query = '(SELECT DISTINCT p.login, p.name, p.sex, p.relationshipStatus, p.birthyear ' + 
//   'FROM Family f JOIN Person p ON f.member = p.login ' +
//   'WHERE f.login = \'' + email + '\') ';
//   // note that email parameter in the request can be accessed using "req.params.email"
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//         res.json(rows);
//     }  
//     });
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