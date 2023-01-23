const express = require('express');
const auth = require('../../middlewares/auth');
// const auth = require('../../middlewares/anonAuth');
const validate = require('../../middlewares/validate');
const blogpostValidation = require('../../validations/blogpost.validation');
const blogpostController = require('../../controllers/blogpost.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBlog'), validate(blogpostValidation.createBlogpost), blogpostController.createBlogpost)
  .get(validate(blogpostValidation.getPosts), blogpostController.getAllBlogposts);

router.route('/user').get(auth(), blogpostController.getBlogpostsByUser);
router.route('/:blogPostId/likes').patch(validate(blogpostValidation.updateLikeCount), blogpostController.updateLikeCount);
router
  .route('/:blogPostId')
  .get(auth('manageBlog'), blogpostController.getBlogpostById)
  .patch(auth('manageBlog'), validate(blogpostValidation.updatePostById), blogpostController.updateBlogpostById)
  .delete(auth('manageBlog'), validate(blogpostValidation.deletePost), blogpostController.deleteBlogpostById);

module.exports = router;
