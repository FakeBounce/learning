function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  resetPassword: '/reset-password'
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
  organisations: path(ROOTS_DASHBOARD, 'organisations'),
  groups: path(ROOTS_DASHBOARD, 'groups'),
  users: path(ROOTS_DASHBOARD, 'users'),
  students: path(ROOTS_DASHBOARD, 'students'),
  externalTesters: path(ROOTS_DASHBOARD, 'external-testers'),
  customize: path(ROOTS_DASHBOARD, 'customize')
};

const ROOT_ORGANISATIONS = PATH_PARAMETERS.organisations;
export const PATH_ORGANISATIONS = {
  root: ROOT_ORGANISATIONS,
  add: path(ROOT_ORGANISATIONS, '/creation'),
  update: path(ROOT_ORGANISATIONS, '/update/:id')
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
