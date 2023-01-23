// const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const reportAttachment = sequelize.define('reportAttachment', {
    attachment: {
      type: dataType.STRING,
      trim: true,
    },
    type: {
      type: dataType.STRING,
      trim: true,
    },
  });

  return reportAttachment;
};
