const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/connect');
const request = chai.request(app);

describe('GET /', () => {

  it('says hello world', () => {
    return request
      .get('/')
      .then(res => res.text)
      .then(text => assert.equal(text, 'hello world!'));
  });
});

describe('POST', () => {
  
  const DB_URI = 'mongodb://localhost:27017/bicycles-test';

  before(() => connection.connect(DB_URI));
  before(() => connection.db.dropDatabase());
  after(() => connection.close());

  it('saves a bicycle', () => {
    return request
      .post('/bicycles')
      .send({ make: 'Trek', type: 'road' })
      .then(res => res.body)
      .then(res => {
        assert.ok(res._id);
      });
  });
});