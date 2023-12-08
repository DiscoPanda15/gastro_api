var express = require('express');
var db = require('../components/models/dbHelper');

var router = express.Router();


router.get('/all', (req, res) => {
	let result = db.query('SELECT * FROM reservation ORDER BY time;');
	result.then((value) => {res.json( value)})
    .catch((error) => {console.log( error )});
});

router.get('/get/:id', (req, res) => {
	let result = db.query(`SELECT * FROM reservation WHERE idReservation = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.get('/seats/', (req, res) => {
	let result = db.query('SELECT MIN(personCount) as minSeats, MAX(personCount) as maxSeats FROM desk;');

	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
})

router.post('/add/:name/:count/:time/:info/:idTable', (req, res) => {
	let result = db.query(`INSERT INTO reservation SET name = "${req.params.name}", count = ${req.params.count}, `
							+ `time = "${req.params.time}", info = "${req.params.info}", idTable = ${req.params.idTable}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

router.put('/update/:name/:count/:time/:info/:idTable/:idReservation', (req, res) => {
	let result = db.query(`UPDATE reservation SET name = "${req.params.name}", info = "${req.params.info}", count = ${req.params.count}, time = "${req.params.time}", idTable = ${req.params.idTable} WHERE idReservation = ${req.params.idReservation};`);

	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
})

router.delete('/delete/:id', (req, res) => {
	let result = db.query(`DELETE FROM reservation WHERE idReservation = ${req.params.id}`);
	result.then( (value) => {res.json( value)})
  	.catch( (error) => {console.log( error )});
});

module.exports = router;