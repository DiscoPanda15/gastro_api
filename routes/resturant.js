var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/info', (req, res) => {
	let result = db.query('SELECT * FROM resturant;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.put('/update/:name', (req, res) => {
	let result = db.query(`UPDATE resturant name = "${req.params.name}";`);
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

module.exports = router;