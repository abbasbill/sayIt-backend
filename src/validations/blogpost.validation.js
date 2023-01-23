const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createBlogpost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    sector: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    likes: Joi.string(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPostById = {
  params: Joi.object().keys({
    blogPostId: Joi.required(),
  }),
};

const updatePostById = {
  params: Joi.object().keys({
    blogPostId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      sector: Joi.string(),
      image: Joi.string(),
      description: Joi.string(),
      likes: Joi.number(),
    })
    .min(1),
};

const updateLikeCount = {
  params: Joi.object().keys({
    blogPostId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      action: Joi.string(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    blogPostId: Joi.required(),
  }),
};

module.exports = {
  createBlogpost,
  getPosts,
  getPostById,
  updatePostById,
  updateLikeCount,
  deletePost,
};
