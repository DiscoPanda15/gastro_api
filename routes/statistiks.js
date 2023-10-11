var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/food', function(req, res, next) {
	let result = db.query('SELECT * FROM reservation ORDER BY time;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});


module.exports = router;