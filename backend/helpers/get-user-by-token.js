const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');

// get user by jwt token
const getUserBYToken = async (token) => {
  if (!token) {
    return res.status(401).json({message: 'Acesso Negado!'});
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findOne({_id: decoded.id});

  return user;
};

module.exports = getUserBYToken;