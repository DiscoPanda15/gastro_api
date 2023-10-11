var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all', function(req, res, next) {
	let result = db.query('SELECT * FROM food;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', function(req, res, next) {
	let result = db.query(`SELECT * FROM food WHERE idFood = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/:name', function(req, res, next) {
	let result = db.query(`INSERT INTO food SET name = "${req.params.name}"`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:idFood/:name', function(req, res, next) {
	let result = db.query(`UPDATE food SET name = "${req.params.name}" WHERE idFood = ${req.params.idFood}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', function(req, res, next) {
	let result = db.query(`DELETE FROM food WHERE idFood = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;