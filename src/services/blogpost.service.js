const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const logger = require('../config/logger');
// const { userService } = require('./index');

/**
 * Create a blogpost
 * @param {Object} postBody
 * @returns {Promise<post>}
 */
const createBlogpost = async (user, postBody) => {
  const newBlogpost = postBody;

  newBlogpost.userId = user.id;

  return db.blogposts.create(newBlogpost);
};

/**
 * Query for blogposts
 * @param {Object} none
 * @returns {Promise<blogposts>}
 */
const getAllBlogposts = async () => {
  const blogposts = await db.blogposts.findAll();
  return blogposts;
};

/**
 * Get blogpost by id
 * @param {ObjectId} id
 * @returns {Promise<report>}
 */
const getBlogpostById = async (id) => {
  const post = await db.blogposts.findByPk(id);
  // eslint-disable-next-line no-console
  console.log(id);
  return post;
};

/**
 * Get all blogposts by a specific user
 * @param {ObjectId} userId
 * @returns {Promise<posts>}
 */
const getBlogpostsByUser = async (user) => {
  const userId = user.dataValues.id;

  const blogposts = await db.blogposts.findAll({ where: { userId } });
  return blogposts;
};

/**
 * Update blogpost by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<blogpost>}
 */
const updateBlogpostById = async (user, postId, updateBody) => {
  const post = await getBlogpostById(postId);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  if (post.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not allowed to edit others' posts");
  }
  Object.assign(post, updateBody);
  await db.blogposts.update(post, { where: { id: postId } });
  return post;
};

/**
 * Update like-Count of a blogpost
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<blogpost>}
 *
 */
const updateLikeCount = async (postId, updateBody) => {
  const post = await getBlogpostById(postId);
  const result = updateBody.action;
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  const counter = result === 'like' ? 1 : -1;
  await post.increment('likes', { by: counter });
  await post.save();
  await db.blogposts.update(post, { where: { id: postId } });

  return post.reload();
};

/**
 * Delete blogpost by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const deleteBlogpostById = async (user, postId) => {
  const post = await getBlogpostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  //   if (post.userId !== user.id) {
  //     throw new ApiError(httpStatus.FORBIDDEN, "You're not allowed to delete others' posts");
  //   }

  await db.blogposts.destroy({ where: { id: postId } });
  return post;
};

module.exports = {
  createBlogpost,
  getAllBlogposts,
  getBlogpostById,
  getBlogpostsByUser,
  updateBlogpostById,
  updateLikeCount,
  deleteBlogpostById,
};
