var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all', (req, res, next) => {
	let result = db.query('SELECT desk.idTable, desk.personCount, desk.name, waiter.idWaiter, waiter.name as waiterName FROM desk LEFT JOIN waiterHasTable ON desk.idTable = waiterHasTable.idTable LEFT JOIN waiter ON waiterHasTable.idWaiter = waiter.idWaiter;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', (req, res, next) => {
	let result = db.query(`SELECT * FROM desk WHERE idTable = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.get('/order/:id', (req, res, next) => {
	let result = db.query(`SELECT * FROM tableHasOrder INNER JOIN foodOrder On tableHasOrder.idOrder = foodOrder.idOrder WHERE idTable = ${req.params.id} AND foodOrder.done != 2`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/:count/:name', (req, res, next) => {
	let result = db.query(`INSERT INTO desk SET personCount = ${req.params.count}, name = "${req.params.name}"`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:idTable/:count/:name', (req, res, next) => {
	let result = db.query(`UPDATE desk SET personCount = ${req.params.count}, name = "${req.params.name}" WHERE idTable = ${req.params.idTable}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/order/:idTable/:idOrder', (req, res, next) => {
	let result = db.query(`INSERT INTO tableHasOrder SET idTable = ${req.params.idTable}, idOrder = ${req.params.idOrder}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', (req, res, next) => {
	let result = db.query(`DELETE FROM desk WHERE idTable = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/hasWaiter/delete/:id', (req, res, next) => {
	let result = db.query(`DELETE FROM waiterHasTable WHERE idTable = ${req.params.id};`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});


module.exports = router;