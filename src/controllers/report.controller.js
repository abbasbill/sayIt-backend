const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reportService, agencyService } = require('../services');
const { reportAttachmentService } = require('../services');
// const { userService } = require('../services');

const createReport = catchAsync(async (req, res) => {
  const agency = await agencyService.getAgentById(req.body.agencyId);
  if (!agency) {
    throw new ApiError(httpStatus.NOT_FOUND, 'agency not found');
  }
  const attachmentBody = req.body.attachments;
  delete req.body.attachments;
  const report = await reportService.createReport(req.user, req.body);
  const reportId = report.id;
  // eslint-disable-next-line no-console
  // console.log(report);
  await reportAttachmentService.createAttachment(attachmentBody, reportId);

  res.status(httpStatus.CREATED).send(report);
});

const getReports = catchAsync(async (req, res) => {
  const result = await reportService.getAllReports();
  res.send(result);
});

const getAgencyReports = catchAsync(async (req, res) => {
  const { id } = req.user.dataValues.agency;
  const reports = await reportService.getReportsByAgency(id);
  res.send(reports);
});

const getReportById = catchAsync(async (req, res) => {
  const report = await reportService.getReportById(req.params.reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'report not found');
  }
  res.send(report);
});

const getReportsByUser = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  // console.log(req.user);
  const result = await reportService.getReportsByUserId(req.user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'request param not found');
  }
  res.send(result);
});

const updateReport = catchAsync(async (req, res) => {
  const report = await reportService.updateReportById(req.user, req.params.reportId, req.body);
  res.send(report);
});

const deleteReport = catchAsync(async (req, res) => {
  await reportService.deleteReportById(req.user, req.params.reportId);
  const success = 'report deleted successfully';
  res.status(httpStatus.NO_CONTENT).send(success);
});

module.exports = {
  createReport,
  getReports,
  getReportById,
  getAgencyReports,
  getReportsByUser,
  updateReport,
  deleteReport,
};
