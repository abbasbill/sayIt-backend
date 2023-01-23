// const validator = require('validator');
// const { roleType } = require('../config/roles');

module.exports = (sequelize, dataType) => {
  const agency = sequelize.define('agency', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },

    name: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      unique: true,
    },
    address: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    sector: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    regNumber: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
  return agency;
};
