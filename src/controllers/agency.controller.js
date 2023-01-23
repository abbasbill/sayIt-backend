const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const { agencyService, userService } = require('../services');
const { roleType } = require('../config/roles');

const createAgent = catchAsync(async (req, res) => {
  const password = `${req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase()}@123`; // password is agency name + @123
  const userBody = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    role: roleType.agent,
    password,
  };
  const agencyUser = await userService.createUser(userBody);
  const agencyBody = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    address: req.body.address,
    sector: req.body.sector,
    regNumber: req.body.regNumber,
    userId: agencyUser.dataValues.id,
  };

  const agency = await agencyService.createAgent(agencyBody);
  const agencyInfo = await agencyService.getAgentById(agency.dataValues.id);
  res.status(httpStatus.CREATED).send(agencyInfo);
});

const getAllAgent = catchAsync(async (req, res) => {
  const agents = await agencyService.getAllAgent();
  res.send(agents);
});

const getAgentById = catchAsync(async (req, res) => {
  const agent = await agencyService.getAgentById(req.params.id);
  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  res.send(agent);
});

module.exports = {
  createAgent,
  getAllAgent,
  getAgentById,
};
