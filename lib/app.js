const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser').json();

const connection = require('./connect');

const DB_URI = 'mongodb://localhost:27017/bicycles';

connection.connect(DB_URI);

app.use(bodyParser);
app.use(morgan('dev'));

app.get('/bicycles', (req, res) => {
  connection.db.collection('bicycles')
    .find()
    .toArray()
    .then(bikes => {
      res.send(bikes);
    })
    .catch(err => console.log('ERRORRR', err)); // eslint-disable-line
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