const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const logger = require('../config/logger');
const { userService } = require('./index');

/**
 * Create a report
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (user, reportBody) => {
  const newReport = reportBody;
  if (!user) {
    newReport.userId = await userService.getUserIdOfAnonymousUser();
    newReport.anonymity = true;
  } else {
    newReport.userId = user.id;
  }
  return db.reports.create(newReport);
};

/**
 * Query for reports
 * @param {Object} none
 * @returns {Promise<reports>}
 */
const getAllReports = async () => {
  const reports = await db.reports.findAll({ include: db.reportAttachments });
  return reports;
};

/**
 * Get all reports for a given agency.
 * @param agencyId - the id of the agency you want to get reports for
 * @returns An array of reports that belong to the agency with the given agencyId.
 */
const getReportsByAgency = async (agencyId) => {
  const reports = await db.reports.findAll({ where: { agencyId } }, { include: db.reportAttachments });
  return reports;
};

/**
 * Get report by id
 * @param {ObjectId} id
 * @returns {Promise<report>}
 */
const getReportById = async (id) => {
  const report = await db.reports.findOne({ where: { id }, include: db.reportAttachments });
  return report;
};

/**
 * Get all reports by a specific user
 * @param {ObjectId} userId
 * @returns {Promise<report>}
 */
const getReportsByUserId = async (user) => {
  let userId;
  if (!user) {
    userId = await userService.getUserIdOfAnonymousUser();
  } else {
    userId = user.dataValues.id;
  }
  const userInfo = await db.users.findByPk(userId, { include: ['reports'] });
  return userInfo.reports;
};

/**
 * Update report by id
 * @param {ObjectId} reportId
 * @param {Object} updateBody
 * @returns {Promise<report>}
 */
const updateReportById = async (user, reportId, updateBody) => {
  const report = await getReportById(reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'report not found');
  }
  if (report.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not allowed to edit others' report");
  }
  Object.assign(report, updateBody);
  await db.reports.update(report, { where: { id: reportId } });
  return report;
};

/**
 * Delete report by id
 * @param {ObjectId} reportId
 * @returns {Promise<report>}
 */
const deleteReportById = async (user, reportId) => {
  const report = await getReportById(reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'report not found');
  }
  if (report.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You're not allowed to delete others' report");
  }
  if (report.status !== 'pending') {
    throw new ApiError(httpStatus.FORBIDDEN, 'report already in review');
  }
  await db.reports.destroy({ where: { id: reportId } });
  return report;
};

module.exports = {
  createReport,
  getAllReports,
  getReportsByAgency,
  getReportById,
  getReportsByUserId,
  updateReportById,
  deleteReportById,
};
