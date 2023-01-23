/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const anonAuth = require('../../middlewares/anonAuth');
const validate = require('../../middlewares/validate');
const reportValidation = require('../../validations/report.validation');
const reportController = require('../../controllers/report.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(reportValidation.createReport), reportController.createReport)
  .get(auth('manageReports'), validate(reportValidation.getReports), reportController.getReports);

// create anonymous report
router.route('/anonymous').post(validate(reportValidation.createReport), reportController.createReport);

// report for ageency
router.route('/agency').get(auth('viewReports'), reportController.getAgencyReports);

router.route('/user').get(auth(), validate(reportValidation.getReports), reportController.getReportsByUser);

router
  .route('/:reportId')
  .get(auth(), validate(reportValidation.getReportById), reportController.getReportById)
  .patch(auth(), validate(reportValidation.updateReportById), reportController.updateReport)
  .delete(auth(), validate(reportValidation.deleteReport), reportController.deleteReport);

module.exports = router;
