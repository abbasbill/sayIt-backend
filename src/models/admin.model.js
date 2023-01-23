// const validator = require('validator');
// const { roleType } = require('../config/roles');

module.exports = (sequelize, dataType) => {
  const admin = sequelize.define('admin', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      // unique: true,
      // trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      // trim: true,
    },
    adminId: {
      type: dataType.INTEGER,
      allowNull: false,
      unique: true,
    },
  });
  return admin;
};
