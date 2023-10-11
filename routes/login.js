var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();

router.get('/check/:username/', function(req, res, next) {
	let result = db.query(`SELECT * FROM waiter WHERE username = "${req.params.username}";`);
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});


module.exports = router;