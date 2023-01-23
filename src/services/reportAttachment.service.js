// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const logger = require('../config/logger');
// const { userService } = require('./index');

/**
 * Create a report
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createAttachment = async (attachmentBody, reportId) => {
  const attachmentArr = attachmentBody;
  const reportID = reportId;
  const keysArr = Object.keys(attachmentArr);
  const objArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keysArr.length; i++) {
    const obj = {
      attachment: keysArr[i],
      type: 'documents',
      reportId: reportID,
    };
    objArr.push(obj);
  }

  const attachments = await db.reportAttachments.bulkCreate(objArr);
  return attachments;
};

module.exports = {
  createAttachment,
  //   getAllReports,
  //   getReportById,
  //   getReportsByUserId,
  //   updateReportById,
  //   deleteReportById,
};
