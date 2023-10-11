var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all', function(req, res, next) {
	let result = db.query('SELECT * FROM waiter;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/byId/:id', function(req, res, next) {
	let result = db.query(`SELECT * FROM waiter WHERE idWaiter = ${req.params.id}`);
	result.then((value) => {res.json(value)})
  	.catch((error) => {console.log(error)});
});

router.get('/get/byUsername/:username', function(req, res, next) {
	let result = db.query(`SELECT * FROM waiter WHERE username = "${req.params.username}"`);
	result.then((value) => {res.json(value)})
  	.catch((error) => {console.log(error)});
});

router.get('/roles/all', (req, res) => {
	let result = db.query('SELECT * FROM roles;');
	result.then((value) => {res.json(value)})
	.catch((error) => {console.error(error)})
})

router.post('/add/:name/:username/:pw/:roles', function(req, res, next) {
	let result = db.insert(`INSERT INTO waiter SET name = "${req.params.name}", username = "${req.params.username}", password = "${req.params.pw}", roles = ${req.params.roles}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/table/add/:idWaiter/:idTable', function(req, res, next) {
	let result = db.query(`INSERT INTO waiterHasTable SET idWaiter = ${req.params.idWaiter}, idTable = ${req.params.idTable}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/table/update/:idWaiter/:idTable', function(req, res, next) {
	let result = db.query(`UPDATE waiterHasTable SET idWaiter = ${req.params.idWaiter} WHERE idTable = ${req.params.idTable}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:idWaiter/:name/:username/:pw/:roles', function(req, res, next) {
	let result = db.query(`UPDATE waiter SET name = "${req.params.name}", username = "${req.params.username}", password = "${req.params.pw}", roles = ${req.params.roles} WHERE idWaiter = ${req.params.idWaiter}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', function(req, res, next) {
	let result = db.query(`DELETE FROM waiter WHERE idWaiter = ${req.params.id};`); // DELETE FROM waiterHasTable WHERE idWaiter = ${req.params.id};
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;