var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all/', (req, res, next) => {
	let result = db.query('SELECT foodOrder.idOrder, foodOrder.foodOrder, foodOrder.orderTime, foodOrder.done, tableHasOrder.idTable, waiter.name FROM foodOrder INNER JOIN tableHasOrder ON foodOrder.idOrder = tableHasOrder.idOrder INNER JOIN waiterHasTable ON tableHasOrder.idTable = waiterHasTable.idTable INNER JOIN waiter ON waiterHasTable.idWaiter = waiter.idWaiter;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', (req, res, next) => {
	let result = db.query(`SELECT * FROM foodOrder WHERE idOrder = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.get('/todo/all', (req, res, next) => {
	let result = db.query(`SELECT foodOrder.idOrder, foodOrder.foodOrder, foodOrder.orderTime, foodOrder.done, tableHasOrder.idTable, waiter.name FROM foodOrder INNER JOIN tableHasOrder ON foodOrder.idOrder = tableHasOrder.idOrder INNER JOIN waiterHasTable ON tableHasOrder.idTable = waiterHasTable.idTable INNER JOIN waiter ON waiterHasTable.idWaiter = waiter.idWaiter WHERE foodOrder.done = 0 ORDER BY idOrder;`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.get('/done/all', (req, res, next) => {
	let result = db.query(`SELECT foodOrder.idOrder, foodOrder.foodOrder, foodOrder.orderTime, foodOrder.done, tableHasOrder.idTable, waiter.name FROM foodOrder INNER JOIN tableHasOrder ON foodOrder.idOrder = tableHasOrder.idOrder INNER JOIN waiterHasTable ON tableHasOrder.idTable = waiterHasTable.idTable INNER JOIN waiter ON waiterHasTable.idWaiter = waiter.idWaiter WHERE foodOrder.done = 1;`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.get('/delivered/all', (req, res, next) => {
	let result = db.query(`SELECT foodOrder.idOrder, foodOrder.foodOrder, foodOrder.orderTime, foodOrder.done, tableHasOrder.idTable, waiter.name FROM foodOrder INNER JOIN tableHasOrder ON foodOrder.idOrder = tableHasOrder.idOrder INNER JOIN waiterHasTable ON tableHasOrder.idTable = waiterHasTable.idTable INNER JOIN waiter ON waiterHasTable.idWaiter = waiter.idWaiter WHERE foodOrder.done = 1;`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.post('/add/:order/:orderTime', (req, res, next) => {
	let result = db.query(`INSERT INTO foodOrder SET foodOrder = '${req.params.order}', orderTime = "${req.params.orderTime}", done = 0;`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:idOrder/:order', (req, res, next) => {
	let result = db.query(`UPDATE foodOrder SET foodOrder = '${req.params.order}' WHERE idOrder = ${req.params.idOrder}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
})

router.post('/table/add/:idOrder/:idTable', (req, res, next) => {
	let result = db.query(`INSERT INTO tableHasOrder SET idOrder = "${req.params.idOrder}", idTable = "${req.params.idTable}";`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/done/:id/:doneNr', (req, res, next) => {
	let result = db.query(`UPDATE foodOrder SET done=${req.params.doneNr} WHERE idOrder=${req.params.id};`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/delete/:id', (req, res, next) => {
	let result = db.query(`DELETE FROM foodOrder WHERE idOrder = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/reset/', (req, res) => {
	db.query(`DELETE FROM foodOrder;`);
	let result = db.query(`DELETE FROM tableHasOrder;`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.delete('/hasTable/delete/:id', (req, res, next) => {
	let result = db.query(`DELETE FROM tableHasOrder WHERE idOrder = ${req.params.id};`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;