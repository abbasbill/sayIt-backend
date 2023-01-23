const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

/*
const sequelizeInstance = new Sequelize(sequelize.database, sequelize.user, sequelize.password, {
  host: sequelize.host,
  dialect: sequelize.dialect,
  pool: {
    min: 0,
    max: 100,
    acquire: 5000,
    Idle: 1000
  },
});
*/
sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.reports = require('./report.model')(sequelizeInstance, Sequelize);
db.reportAttachments = require('./reportAttachment.model')(sequelizeInstance, Sequelize);
db.blogposts = require('./blogpost.model')(sequelizeInstance, Sequelize);
db.blogComments = require('./blogComment.model')(sequelizeInstance, Sequelize);

db.agencies = require('./agency.model')(sequelizeInstance, Sequelize);
db.admins = require('./admin.model')(sequelizeInstance, Sequelize);
// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Role);
// db.Role.belongsTo(db.User);

db.users.hasMany(db.reports);
db.reports.belongsTo(db.users);

db.reports.hasMany(db.reportAttachments);
db.reportAttachments.belongsTo(db.reports);

db.agencies.hasMany(db.reports);
db.reports.belongsTo(db.agencies);

db.users.hasMany(db.blogposts);
db.blogposts.belongsTo(db.users);

db.blogposts.hasMany(db.blogComments);
db.blogComments.belongsTo(db.blogposts);

db.users.hasOne(db.admins);
db.admins.belongsTo(db.users);

db.users.hasOne(db.agencies);
db.agencies.belongsTo(db.users);

module.exports = {
  db,
};
