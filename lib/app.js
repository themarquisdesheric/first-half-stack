const parseUrl = require('url').parse;

const bicycles = require('./routes/bicycles');
const notFound = require('./routes/not-found');

const routes = {
  '/bicycles': bicycles
};

function app(req, res) {
  const url = parseUrl(req.url, true);
  const route = routes[url.pathname] || notFound;
  
  res.setHeader('Content-Type', 'application/json');
  route(req, res);
}

module.exports = app;