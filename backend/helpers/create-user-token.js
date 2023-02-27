const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createUserToken = async (user, req, res) => {
  // create a token
  const { name, _id } = user;

  const token = jwt.sign({
      name,
      id: _id,
    },
    process.env.SECRET_KEY,
    {
     // expiresIn: '7d',
    },
  );

  // return token

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: "strict",
  }).status(200).json({
    message: 'Você está autenticado',
    token,
    userId: _id,
  });
};

module.exports = createUserToken;