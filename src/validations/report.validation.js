const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createReport = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
    agencyId: Joi.number().required(),
    reportee: Joi.string().required(),
    sector: Joi.string().required(),
    affiliation: Joi.boolean().required(),
    message: Joi.string().required(),
    anonymity: Joi.boolean(),
    attachments: Joi.required(),
    status: Joi.string(),
  }),
};

const getReports = {
  query: Joi.object().keys({
    title: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReportById = {
  params: Joi.object().keys({
    reportId: Joi.required(),
  }),
};

const updateReportById = {
  params: Joi.object().keys({
    reportId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      organization: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteReport = {
  params: Joi.object().keys({
    reportId: Joi.required(),
  }),
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReportById,
  deleteReport,
};
