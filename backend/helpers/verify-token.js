const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const getToken = require('./get-token');

dotenv.config();

// middleware to validate token
const verifyToken = (req, res, next) => {

  console.log(req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(401).json({message: 'Acesso Negado!'});
  }

  const token = getToken(req)

  if (!token) {
    return res.status(401).json({message: 'Acesso Negado!'});
  }

  try {

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();

  } catch (error) {

    return res.status(400).json({message: 'Token inválido'});

  }
};

module.exports = verifyToken;