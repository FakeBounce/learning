function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/login';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  resetPassword: path(ROOTS_AUTH, '/reset-password')
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  courseList: path(ROOTS_DASHBOARD, '/course-list'),
  modulesList: path(ROOTS_DASHBOARD, '/modules-list')
};

export const PATH_PARAMETERS = {
  root: ROOTS_DASHBOARD, // @todo update with the correct path
  roles: '/roles',
  organisations: '/organisations',
  groups: '/groups',
  users: '/users',
  students: '/students',
  externalTesters: '/external-testers',
  customize: '/customize'
};
