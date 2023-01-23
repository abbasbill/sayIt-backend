const validator = require('validator');
const { roleType } = require('../config/roles');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    userName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      unique: true,
      validate: {
        notNull: { msg: 'Please enter username' },
      },
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    role: {
      type: dataType.ENUM(roleType.reporter, roleType.agent, roleType.admin),
      defaultValue: roleType.reporter,
    },
    phoneNumber: {
      type: dataType.STRING,
      allowNull: false,
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
    },
  });

  return user;
};
