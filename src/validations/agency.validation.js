const Joi = require('joi');

const createAgency = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    userName: Joi.string().required(),
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    sector: Joi.string().required(),
    regNumber: Joi.number().required(),
  }),
};

const getAgencyById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  createAgency,
  getAgencyById,
};
