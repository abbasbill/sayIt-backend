// const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const report = sequelize.define('report', {
    subject: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    // agency: {
    //   type: dataType.STRING,
    //   allowNull: false,
    //   trim: true,
    // },
    reportee: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    sector: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    affiliation: {
      type: dataType.BOOLEAN,
      allowNull: false,
    },
    message: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    anonymity: {
      type: dataType.BOOLEAN,
      trim: true,
    },
    status: {
      type: dataType.STRING,
      defaultValue: 'pending',
    },
    attachments: {
      type: dataType.STRING,
    },
  });

  return report;
};
