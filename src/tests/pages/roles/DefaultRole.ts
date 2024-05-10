export const defaultRole = {
  id: 5,
  name: 'test',
  description: 'Role de test',
  isClientAdmin: false
};

export const defaultAdminRole = {
  id: 4,
  name: 'test admin',
  description: 'Role de test admin',
  isClientAdmin: true
};

export const defaultRolesList = [
  {
    id: 5,
    name: 'test',
    description: 'Role de test'
  },
  {
    id: 6,
    name: 'test2',
    description: 'Role de test 2'
  },
  {
    id: 7,
    name: 'test3',
    description: 'Role de test 3'
  }
];

export const defaultRolePermissions = {
  see_users: true,
  add_users: true,
  update_users: true,
  delete_users: true,
  see_roles: true,
  add_roles: true,
  update_roles: true,
  delete_roles: true,
  see_applicants: true,
  add_applicants: true,
  add_mass_applicants: true,
  update_applicants: true,
  block_applicants: true,
  see_external_testers: true,
  add_external_testers: true,
  update_external_testers: true,
  add_mass_testers: true,
  block_external_testers: true,
  see_groups: true,
  add_groups: true,
  update_groups: true,
  delete_groups: true,
  see_personalization: true,
  add_courses: true,
  add_modules: true
};
