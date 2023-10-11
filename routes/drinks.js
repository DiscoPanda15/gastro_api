var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();

router.get('/all', function(req, res, next) {
	let result = db.query('SELECT * FROM drink;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', function(req, res, next) {
	let result = db.query(`SELECT * FROM drink WHERE idDrink = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/:name', function(req, res, next) {
	let result = db.query(`INSERT INTO drink SET name = "${req.params.name}"`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:idDrink/:name', function(req, res, next) {
	let result = db.query(`UPDATE drink SET name = "${req.params.name}" WHERE idDrink = ${req.params.idDrink}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', function(req, res, next) {
	let result = db.query(`DELETE FROM drink WHERE idDrink = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;