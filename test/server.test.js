const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/connect');
const request = chai.request(app);

describe('POST /bicycles', () => {
  
  const DB_URI = 'mongodb://localhost:27017/bicycles-test';

  before(() => connection.connect(DB_URI));
  before(() => connection.db.dropDatabase());
  after(() => connection.close());

  it('saves a bicycle', () => {
    return request
      .post('/bicycles')
      .send({ make: 'Trek', type: 'road' })
      .then(res => res.body)
      .then(res => assert.ok(res._id))
      .catch(err => console.log(err)); // eslint-disable-line
  });

  describe('GET /bicycles', () => {

    it('returns an array of resources in the database', () => {
      return request
        .get('/bicycles')
        .then(res => {
          assert.ok(res.body[0]._id);
        })
        .catch(err => console.log(err)); // eslint-disable-line
    });
  });
  
});
