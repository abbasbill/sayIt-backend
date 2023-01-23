const roleType = {
  reporter: 'reporter',
  agent: 'agent',
  admin: 'admin',
};
const allRoles = {
  reporter: [],
  agent: ['viewReports'],
  admin: ['manageAgents', 'manageBlog', 'manageReports'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  roleType,
};
