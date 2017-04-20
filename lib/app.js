const bicycles = require('./routes/bicycles');
const notFound = require('./routes/not-found');

const routes = {
  '/bicycles': bicycles
};

function app(req, res) {
  const route = routes[req.url] || notFound;

  console.log(req.method, req.url);
  
  res.setHeader('Content-Type', 'application/json');
  route(req, res);
}

module.exports = app;