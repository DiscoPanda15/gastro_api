var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all', function(req, res, next) {
	let result = db.query('SELECT * FROM reservation ORDER BY time;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', function(req, res, next) {
	let result = db.query(`SELECT * FROM reservation WHERE idReservation = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/:name/:count/:time/:info/:idTable', function(req, res, next) {
	let result = db.query(`INSERT INTO reservation SET name = "${req.params.name}", count = ${req.params.count}, `
							+ `time = "${req.params.time}", info = "${req.params.info}", idTable = ${req.params.idTable}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', function(req, res, next) {
	let result = db.query(`DELETE FROM reservation WHERE idReservation = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;