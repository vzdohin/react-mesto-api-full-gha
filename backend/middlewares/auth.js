/* eslint-disable no-unused-expressions */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-key');
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('Токен не прошел проверку'));
  }
  return next();
};
