const jwt = require('jsonwebtoken')

module.exports = (request) => {
  const token = request.header('Authorization');
  const cutToken = token.substring(7);
  const verified = jwt.verify(cutToken, process.env.TOKEN_SECRET);
  return verified;
};
