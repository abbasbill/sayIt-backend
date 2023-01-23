const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { agencyController } = require('../../controllers');

const { agencyValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth('manageAgents'), validate(agencyValidation.createAgency), agencyController.createAgent)
  .get(auth(), agencyController.getAllAgent);

router.route('/:id').get(auth(), validate(agencyValidation.getAgencyById), agencyController.getAgentById);

module.exports = router;
