module.exports = (sequelize, dataType) => {
  const blogpost = sequelize.define('blogPost', {
    title: {
      type: dataType.STRING,
      trim: true,
      allowNull: false,
    },
    sector: {
      type: dataType.STRING,
      trim: true,
    },
    image: {
      type: dataType.STRING,
      trim: true,
    },
    description: {
      type: dataType.STRING,
      trim: true,
    },
    likes: {
      type: dataType.INTEGER,
      defaultValue: 0,
      trim: true,
    },
  });

  return blogpost;
};
