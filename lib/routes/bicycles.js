const ObjectId = require('mongodb').ObjectId;

const connect = require('../connect');
const notFound = require('./not-found');

function bicycles(req, res) {
  const road = connect.db.collection('road');

  if (req.method === 'POST') {
    res.end('post request!');
  } else {
    //GET request for a specific ID
    if (req.params.id) {
      return road.findOne({ _id: ObjectId(req.params.id) })
        .then(bike => {
          if (!bike) return notFound(req, res);

          const serialized = JSON.stringify(bike);
          res.end(serialized);
        })
        .catch(err => {
          res.end(err);
        });
    } 
    //GET request: return all bicycles
    return road.find(req.query)
      .toArray()
      .then(bikes => {
        const serialized = JSON.stringify(bikes);
        res.end(serialized);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = bicycles;