const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const logger = require('../config/logger');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async function (email) {
  const user = await db.users.findOne({ where: { email } });
  logger.info(user);
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async function (password, user) {
  const comp = bcrypt.compareSync(password, user.password);
  logger.info(comp);
  return comp;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // eslint-disable-next-line no-param-reassign
  userBody.password = bcrypt.hashSync(userBody.password, 8);
  return db.users.create(userBody);
};
/**
 * It creates an anonymous user if one doesn't exist
 */

const createAnonymousUser = async () => {
  const anonUser = {
    userName: 'Anon',
    email: 'anon@email.com',
    phoneNumber: '08075857854',
    password: 'Password@123',
  };
  anonUser.password = bcrypt.hashSync(anonUser.password, 8);
  db.users.findOrCreate({
    where: { userName: 'Anon' },
    defaults: {
      email: anonUser.email,
      phoneNumber: anonUser.phoneNumber,
      password: anonUser.password,
    },
  });
};

const adminUser = [
  {
    userName: 'Thoed000',
    email: 'theodoranneoma@gmail.com',
    phoneNumber: '08012345678',
    password: bcrypt.hashSync('Theodora@123', 8),
    role: 'admin',
  },
  {
    userName: 'Godswill000',
    email: 'godswilludoh@gmail.com',
    phoneNumber: '08012345678',
    password: bcrypt.hashSync('Godswill@123', 8),
    role: 'admin',
  },
  {
    userName: ' Ahmed000',
    email: 'lameda789@gmail.com',
    phoneNumber: '08012345678',
    password: bcrypt.hashSync('Ahmed@123', 8),
    role: 'admin',
  },
];
const createAdminUsers = async () => {
  const users = await db.users.bulkCreate(adminUser, {
    updateOnDuplicate: ['userName', 'email', 'phoneNumber', 'password', 'role'],
  });
  return users;
};

/**
 * Find the user with the userName 'Anon' and return their id.
 * @returns The id of the user with the userName 'Anon'
 */
const getUserIdOfAnonymousUser = async () => {
  const user = await db.users.findOne({ where: { userName: 'Anon' } });
  return user.dataValues.id;
};

/**
 * Get the user with the userName 'Anon' from the database.
 * @returns The user object
 */
const getAnonymousUser = async () => {
  const user = await db.users.findOne({ where: { userName: 'Anon' } });
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await db.users.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return db.users.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return db.users.findOne({ where: { email } });
};

const getUserByUserName = async (userName) => {
  return db.users.findOne({ where: { userName } });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await db.users.update(user);
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await db.users.destroy(user);
  return user;
};

module.exports = {
  createUser,
  createAdminUsers,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUserName,
  updateUserById,
  deleteUserById,
  isPasswordMatch,
  createAnonymousUser,
  getAnonymousUser,
  getUserIdOfAnonymousUser,
};
