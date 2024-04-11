import LoadableComponent from './LoadableComponent';
import { lazy } from 'react';
// ----------------------------------------------------------------------

// AUTH
export const LoginPage = LoadableComponent(lazy(() => import('@src/pages/login/LoginPage')));
export const ForgotPasswordPage = LoadableComponent(lazy(() => import('@src/pages/login/forgot-password/ForgotPasswordPage')));

// MAIN
export const Page404 = LoadableComponent(lazy(() => import('../pages/errors/Page404')));

/**
 Organizations
 **/

export const Organizations = LoadableComponent(
  lazy(() => import('@src/pages/organizations/organizations-list/OrganizationsList'))
);
export const OrganizationsCreate = LoadableComponent(
  lazy(() => import('@src/pages/organizations/organizations-create/OrganizationsCreate'))
);

export const OrganizationsUpdate = LoadableComponent(
  lazy(() => import('@src/pages/organizations/organizations-update/OrganizationsUpdate'))
);

//Users

export const Users = LoadableComponent(lazy(() => import('@src/pages/users/users-list/UsersList')));
export const UserProfile = LoadableComponent(
  lazy(() => import('@src/pages/users/user-profile/UserProfile'))
);

export const UserEdit = LoadableComponent(
  lazy(() => import('@src/pages/users/user-edit/UserEdit'))
);

/**
 Applicants
 **/
export const Applicants = LoadableComponent(
  lazy(() => import('@src/pages/applicants/applicants-list/ApplicantsList'))
);

export const ApplicantsUpdate = LoadableComponent(
  lazy(() => import('@src/pages/applicants/applicants-update/ApplicantsUpdate'))
);
export const ApplicantsCreate = LoadableComponent(
  lazy(() => import('@src/pages/applicants/applicants-create/ApplicantsCreate'))
);

/**
 External Testers
 **/

export const ExternalTesters = LoadableComponent(
  lazy(() => import('@src/pages/externalTesters/externalTesters-list/ExternalTestersList'))
);
export const ExternalTestersCreate = LoadableComponent(
  lazy(() => import('@src/pages/externalTesters/externalTesters-create/ExternalTestersCreate'))
);
export const ExternalTestersUpdate = LoadableComponent(
  lazy(() => import('@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdate'))
);

/**
 Roles
 **/
export const Roles = LoadableComponent(lazy(() => import('@src/pages/roles/roles-list/RolesList')));

/**
 Groups
 **/
export const Groups = LoadableComponent(
  lazy(() => import('@src/pages/groups/groups-list/GroupsList'))
);
