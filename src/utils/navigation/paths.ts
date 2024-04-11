import { ApplicantType } from '@services/applicants/interfaces';

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const getApplicantPath = (type: ApplicantType) => {
  return type === ApplicantType.TESTER ? PATH_EXTERNAL_TESTERS : PATH_APPLICANTS;
};

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
};

export const PATH_ERRORS = {
  root: '/404',
  '403': '/403'
};

// Used for dashboard navigation
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  courseList: path(ROOTS_DASHBOARD, 'course-list'),
  modulesList: path(ROOTS_DASHBOARD, 'modules-list')
};

// Used for sidebar navigation parameters
export const PATH_PARAMETERS = {
  root: ROOTS_DASHBOARD,
  roles: path(ROOTS_DASHBOARD, 'roles'),
  organizations: path(ROOTS_DASHBOARD, 'organizations'),
  groups: path(ROOTS_DASHBOARD, 'groups'),
  users: path(ROOTS_DASHBOARD, 'users'),
  applicants: path(ROOTS_DASHBOARD, 'applicants'),
  externalTesters: path(ROOTS_DASHBOARD, 'external-testers'),
  customize: path(ROOTS_DASHBOARD, 'customize')
};

const ROOT_ORGANIZATIONS = PATH_PARAMETERS.organizations;
export const PATH_ORGANIZATIONS = {
  root: ROOT_ORGANIZATIONS,
  add: path(ROOT_ORGANIZATIONS, '/create'),
  update: path(ROOT_ORGANIZATIONS, '/update/:organizationId')
};

const ROOT_APPLICANTS = PATH_PARAMETERS.applicants;
export const PATH_APPLICANTS = {
  root: ROOT_APPLICANTS,
  profile: path(ROOT_APPLICANTS, '/profile/:applicantId'),
  add: path(ROOT_APPLICANTS, '/create')
};

const ROOT_EXTERNAL_TESTERS = PATH_PARAMETERS.externalTesters;
export const PATH_EXTERNAL_TESTERS = {
  root: ROOT_EXTERNAL_TESTERS,
  profile: path(ROOT_EXTERNAL_TESTERS, '/profile/:applicantId'),
  add: path(ROOT_EXTERNAL_TESTERS, '/create'),
  addBulk: path(ROOT_EXTERNAL_TESTERS, '/create-bulk')
};

const ROOT_ROLES = PATH_PARAMETERS.roles;
export const PATH_ROLES = {
  root: ROOT_ROLES,
  add: path(ROOT_ROLES, '/create'),
  update: path(ROOT_ROLES, '/update/:roleId'),
  managePermission: path(ROOT_ROLES, '/manage-permissions/:roleId')
};

//Users
const ROOT_USERS = PATH_PARAMETERS.users;
export const PATH_USERS = {
  root: ROOT_USERS,
  add: path(ROOT_USERS, '/create'),
  addBulk: path(ROOT_USERS, '/create-bulk'),
  profile: path(ROOT_USERS, '/profile/:id'),
  edit: path(ROOT_USERS, '/edit/:id')
};

//Groups
const ROOT_GROUPS = PATH_PARAMETERS.groups;
export const PATH_GROUPS = {
  root: ROOT_GROUPS,
  add: path(ROOT_GROUPS, '/create'),
  update: path(ROOT_GROUPS, '/update/:roleId'),
};
