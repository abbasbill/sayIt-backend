const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { blogpostService } = require('../services');
// const { userService } = require('../services');

const createBlogpost = catchAsync(async (req, res) => {
  const post = await blogpostService.createBlogpost(req.user, req.body);

  // eslint-disable-next-line no-console
  console.log(post);

  res.status(httpStatus.CREATED).send(post);
});

const getAllBlogposts = catchAsync(async (req, res) => {
  const result = await blogpostService.getAllBlogposts();
  res.send(result);
});

const getBlogpostById = catchAsync(async (req, res) => {
  const post = await blogpostService.getBlogpostById(req.params.blogPostId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'post not found');
  }
  res.send(post);
});

const getBlogpostsByUser = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.user);
  const result = await blogpostService.getBlogpostsByUser(req.user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request param not found');
  }
  res.send(result);
});

const updateBlogpostById = catchAsync(async (req, res) => {
  const post = await blogpostService.updateBlogpostById(req.user, req.params.blogPostId, req.body);
  res.send(post);
});

const updateLikeCount = catchAsync(async (req, res) => {
  const post = await blogpostService.updateLikeCount(req.params.blogPostId, req.body);
  res.send(post);
});

const deleteBlogpostById = catchAsync(async (req, res) => {
  await blogpostService.deleteBlogpostById(req.user, req.params.blogPostId);
  const success = 'post deleted successfully';
  res.status(httpStatus.NO_CONTENT).send(success);
});

module.exports = {
  createBlogpost,
  getAllBlogposts,
  getBlogpostById,
  getBlogpostsByUser,
  updateBlogpostById,
  updateLikeCount,
  deleteBlogpostById,
};
