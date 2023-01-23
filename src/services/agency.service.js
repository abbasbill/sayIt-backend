const { db } = require('../models');
/**
 * This function creates an agent and returns it.
 * @param agentBody - {
 * @returns The agent object.
 */

const createAgent = async (agencyBody) => {
  const agent = db.agencies.create(agencyBody);
  return agent;
};
/**
 * It returns a promise that resolves to an array of all agents in the database.
 * @returns An array of objects.
 */

const getAllAgent = async () => {
  const allAgent = db.agencies.findAll({ include: db.users });
  return allAgent;
};
/**
 * This function returns a promise that resolves to an agent object that has a user object nested
 * inside of it.
 * @returns An object with the following properties:
 */

const getAgentById = async (reportId) => {
  const agent = db.agencies.findOne({ where: { id: reportId }, include: db.users });
  return agent;
};

module.exports = {
  createAgent,
  getAllAgent,
  getAgentById,
};
