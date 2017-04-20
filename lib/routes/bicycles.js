const connect = require('../connect');

function bicycles(req, res) {
  const road = connect.db.collection('road');
  
  return road.find()
    .toArray()
    .then(bikes => {
      const serialized = JSON.stringify(bikes);
      res.end(serialized);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = bicycles;