const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
// const { db } = require('../models');
const { userService } = require('../services');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    // const anonInfo = await db.users.findByPk(1);
    const anonInfo = await userService.getAnonymousUser();
    req.user = anonInfo.dataValues;
    // return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  } else {
    req.user = user;
  }

  if (requiredRights.length) {
    const userRights = roleRights.get(user.dataValues.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
