import LoadableComponent from './LoadableComponent';
import { lazy } from 'react';
// ----------------------------------------------------------------------

// AUTH
export const LoginPage = LoadableComponent(lazy(() => import('@src/pages/login/LoginPage')));
export const ForgotPasswordPage = LoadableComponent(
  lazy(() => import('@src/pages/login/forgot-password/ForgotPasswordPage'))
);

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
  lazy(() => import('@src/pages/users/users-profile/UserProfile'))
);

export const UserEdit = LoadableComponent(
  lazy(() => import('@src/pages/users/users-edit/UserEdit'))
);
export const UserBluk = LoadableComponent(
  lazy(() => import('@src/pages/users/users-bulk/UsersBulk'))
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
export const ApplicantsBulk = LoadableComponent(
  lazy(() => import('@src/pages/applicants/applicants-bulk/ApplicantsBulk'))
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
export const ExternalTestersBulk = LoadableComponent(
  lazy(() => import('@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulk'))
);

/**
 Roles
 **/
export const Roles = LoadableComponent(lazy(() => import('@src/pages/roles/roles-list/RolesList')));
export const RolesCreate = LoadableComponent(
  lazy(() => import('@src/pages/roles/roles-create/RolesCreate'))
);
export const RolesUpdate = LoadableComponent(
  lazy(() => import('@src/pages/roles/roles-update/RolesUpdate'))
);
export const RolesPermissions = LoadableComponent(
  lazy(() => import('@src/pages/roles/roles-permissions/RolesPermissions'))
);

/**
 Groups
 **/
export const Groups = LoadableComponent(
  lazy(() => import('@src/pages/groups/groups-list/GroupsList'))
);
export const GroupsCreate = LoadableComponent(
  lazy(() => import('@src/pages/groups/groups-create/GroupsCreate'))
);
export const GroupsUpdate = LoadableComponent(
  lazy(() => import('@src/pages/groups/groups-update/GroupsUpdate'))
);

/**
 Modules
 **/
export const Modules = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-list/ModulesList'))
);
export const ModulesCreate = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-create/ModulesCreate'))
);
export const ModulesProfile = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-profile/ModulesProfile'))
);

/**
 * Modules Video
 */
export const ModulesVideoCreate = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-video/ModulesVideoCreate'))
);
export const ModulesVideoDetail = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-video/ModulesVideoDetail'))
);

/**
 * Modules Images
 */
export const ModulesImageCreate = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-image/ModulesImageCreate'))
);
export const ModulesImageDetail = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-image/ModulesImageDetail'))
);

/**
 * Modules Documents
 */
export const ModulesDocumentCreate = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-document/ModulesDocumentCreate'))
);
export const ModulesDocumentDetail = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-document/ModulesDocumentDetail'))
);

/**
 * Modules Audios
 */
export const ModulesAudioCreate = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-audio/ModulesAudioCreate'))
);
export const ModulesAudioDetail = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-media/modules-audio/ModulesAudioDetail'))
);

/**
 * Modules Questions
 */
export const ModulesQuestionTrueFalse = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-question/modules-question-true-false/ModulesQuestionTrueFalse'))
);
export const ModulesQuestionUnique = LoadableComponent(
  lazy(() => import('@src/pages/modules/modules-question/modules-question-unique/ModulesQuestionUnique'))
);
