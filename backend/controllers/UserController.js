const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserBYToken = require('../helpers/get-user-by-token');

dotenv.config();

module.exports = class UserController {

  static async register(req, res) {
    const {
      name,
      email,
      phone,
      password,
      confirmpassword,
    } = req.body;

    // Validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!'});
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'});
      return;
    }

    const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    const validEmail = email.match(emailRegex);

    if (!validEmail) {
      res.status(422).json({ message: 'O e-mail é inválido!'});
      return;
    }

    const userExists = await User.findOne({email});

    if (userExists) {
      res.status(422).json({ message: 'E-mail já cadastrado!'});
      return;
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!'});
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!'});
      return;
    }

    if (password.length < 6) {
      res.status(422).json({ message: 'A senha deve possuir no mínimo 6 dígitos!'});
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação da senha é obrigatória!'});
      return;
    }

     if (confirmpassword.length < 6) {
      res.status(422).json({ message: 'A confirmação deve possuir no mínimo 6 dígitos!'});
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas e a confirmação não são iguais!'});
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(+process.env.SALT)
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);

    } catch(err) {
      res.status(500).json({ message: err});
    }
  };

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!'});
      return;
    }

    const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    const validEmail = email.match(emailRegex);

    if (!validEmail) {
      res.status(422).json({ message: 'O e-mail é inválido!'});
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!'});
      return;
    }

    const user = await User.findOne({email});

    if (!user) {
      res.status(513).json({ message: 'E-mail não cadastrado!'});
      return;
    }

    // check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(403).json({ message: 'Senha inválida!'});
      return;
    }

    await createUserToken(user, req, res);
  };

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {

      const token = getToken(req);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;

    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  };

  static async getUserById(req, res) {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(513).json({ message: 'Usuário não cadastrado!'});
      return;
    }

    res.status(200).json({user});
  };

  static async editUser(req, res) {

    const { id } = req.params;

    // chek if user exists
    const token = getToken(req);
    const user = await getUserBYToken(token);

    if (!user) {
      res.status(513).json({ message: 'Usuário não cadastrado!'});
      return;
    }

    const {
      name,
      email,
      phone,
      password,
      confirmpassword,
    } = req.body;

    if (req.file) {
      user.image = req.file.filename;
    }

     // Validations
     if (!name) {
      return res.status(422).json({ message: 'O nome é obrigatório!'});
    }

    user.name = name;

    if (!email) {
      return res.status(422).json({ message: 'O e-mail é obrigatório!'});
    }

    const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    const validEmail = email.match(emailRegex);

    if (!validEmail) {
      return res.status(422).json({ message: 'O e-mail é inválido!'});
    }

    const userExists = await User.findOne({email});

    if (userExists && userExists.email !== user.email ) {
      return res.status(422).json({ message: 'E-mail já cadastrado'});
    }

    user.email = email;

    if (!phone) {
      return res.status(422).json({ message: 'O telefone é obrigatório!'});
    }

    user.phone = phone;

    if (password && password.length < 6) {
      res.status(422).json({ message: 'A senha deve possuir no mínimo 6 dígitos!'});
      return;
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: 'As senhas e a confirmação não são iguais!'});

    }

    if (password === confirmpassword && password ) {
      // creating password
      const salt = await bcrypt.genSalt(+process.env.SALT)
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      // return user updated data
      await User.findOneAndUpdate(
        {_id: user._id },
        { $set: user },
        { new: true },
      );

      return res.status(200).json({message: 'Usuário atualizado com sucesso!'});

    } catch (error) {
      return res.status(500).json({message: error})
    }

  };
};