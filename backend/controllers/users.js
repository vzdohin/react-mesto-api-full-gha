/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  BadRequestError,
  NotFoundError,
  ConfictRequestError,
  // UnauthorizedError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      // console.log(userId);
      const token = jwt.sign({ userId }, NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(STATUS_CODE_OK)
        .send({ token });
    })
    // .catch(() => next(new UnauthorizedError('Неправильные почта или пароль')));
    .catch(next);
};
// logout
module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Вы успешно вышли' });
};
// создать пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(STATUS_CODE_CREATED).send({
        data: {
          name,
          about,
          avatar,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConfictRequestError('Email уже используется'));
      }
      next(err);
    });
};

// получить всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_CODE_OK).send({ users }))
    // .catch(() => {
    //   next(new UnauthorizedError('Вы не авторизованы '));
    // });
    .catch(next);
};

// получить пользователя по айди
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      if ((!user) || (req.params.userId !== req.user.userId)) {
        throw new NotFoundError('Пользователь не найден');
      } return res.status(STATUS_CODE_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некоректные данные'));
      } next(err);
    });
};
// // получить данные профиля
module.exports.getMyProfile = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } return res.status(STATUS_CODE_OK).send(user);
    })
    .catch(next);
};

// обновить информацию профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(STATUS_CODE_OK).send(user))
    // .catch((err) => {
    //   if (err.name === 'ValidationError') {
    //     return next(new BadRequestError('Переданы некорректные данные'));
    //   }
    //   next(err);
    // });
    .catch(next);
};

// обновить аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((ava) => res.status(STATUS_CODE_OK).send(ava))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некоректные данные'));
      }
      next(err);
    });
};
