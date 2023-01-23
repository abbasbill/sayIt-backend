module.exports = (sequelize, dataType) => {
  const blogComment = sequelize.define('blogComment', {
    description: {
      type: dataType.STRING,
      trim: true,
    },
    likes: {
      type: dataType.STRING,
      trim: true,
    },
  });

  return blogComment;
};
