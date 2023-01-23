const { db } = require('../models');
const { userService } = require('.');

const admin = [
  {
    firstName: 'Theodora',
    lastName: 'Orji',
    adminId: 100,
  },
  {
    firstName: 'Godswill',
    lastName: 'Udoh',
    adminId: 101,
  },
  {
    firstName: 'Ahmed',
    lastName: 'Adenigba',
    adminId: 102,
  },
];

const createAdminUser = async () => {
  const users = await userService.createAdminUsers();

  users.forEach((user, index) => {
    admin[index].userId = user.dataValues.id;
  });

  const admins = db.admins.bulkCreate(admin, {
    updateOnDuplicate: ['firstName', 'lastName', 'adminId'],
  });
  return admins;
};

module.exports = {
  createAdminUser,
};
