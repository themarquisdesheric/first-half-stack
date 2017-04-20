module.exports = function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = 'route not found';
  res.end('resource not found');
};