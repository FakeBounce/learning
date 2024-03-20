function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  resetPassword: '/reset-password'
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
  add: path(ROOT_ORGANIZATIONS, '/creation'),
  update: path(ROOT_ORGANIZATIONS, '/update/:organizationId')
};

const ROOT_APPLICANTS = PATH_PARAMETERS.applicants;
export const PATH_APPLICANTS = {
  root: ROOT_APPLICANTS,
  profile: path(ROOT_APPLICANTS, '/profile/:applicantId'),
  add: path(ROOT_APPLICANTS, '/creation'),
  update: path(ROOT_APPLICANTS, '/update/:applicantId')
};

//Users
const ROOT_USERS = PATH_PARAMETERS.users;
export const PATH_USERS = {
  root: ROOT_USERS,
  add: path(ROOT_USERS, '/create'),
  addMassive: path(ROOT_USERS, '/massive-create'),
  profile: path(ROOT_USERS, '/profile/:id'),
  edit: path(ROOT_USERS, '/edit/:id')
};
