// const app = require('./lib/app');
const DB_URI = 'mongodb://localhost:27017/bicycles';

const connection = require('./lib/connect');
connection.connect(DB_URI);