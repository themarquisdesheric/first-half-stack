const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connection = require('./connect');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  connection.db.collection('bicycles')
    .find()
    .toArray()
    .then(bikes => {
      res.send(bikes);
    })
    .catch(err => console.log('ERRORRR', err));
});

app.post('/bicycles', (req, res) => {
  connection.db.collection('bicycles')
    .insert(req.body)
    .then(response => response.ops[0])
    .then(savedBike => res.send(savedBike))
    .catch(err => console.log(err)); // eslint-disable-line
});

app.listen(3000, () => {
  console.log('app listening on port 3000!'); // eslint-disable-line
});

module.exports = app;