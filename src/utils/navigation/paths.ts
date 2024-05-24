import { ApplicantType } from '@services/applicants/interfaces';
import { QuestionType } from '@services/modules/interfaces';

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
  forgotPassword: '/forgot-password'
};

export const PATH_ERRORS = {
  root: '/404',
  forbidden: '/403'
};

// Used for dashboard navigation
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  courses: path(ROOTS_DASHBOARD, 'courses'),
  modules: path(ROOTS_DASHBOARD, 'modules')
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
  add: path(ROOT_APPLICANTS, '/create'),
  addBulk: path(ROOT_APPLICANTS, '/create-bulk')
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
  profile: path(ROOT_USERS, '/profile/:userId'),
  update: path(ROOT_USERS, '/update/:userId')
};

//Groups
const ROOT_GROUPS = PATH_PARAMETERS.groups;
export const PATH_GROUPS = {
  root: ROOT_GROUPS,
  add: path(ROOT_GROUPS, '/create'),
  update: path(ROOT_GROUPS, '/profile/:groupId')
};

// Modules
const ROOT_MODULES = PATH_DASHBOARD.modules;
export const PATH_MODULES = {
  root: ROOT_MODULES,
  add: path(ROOT_MODULES, '/create'),
  profile: path(ROOT_MODULES, '/:moduleId'),
  question: path(ROOT_MODULES, '/:moduleId/question/create'),
  questionDetail: path(ROOT_MODULES, '/:moduleId/question/:questionId'),
  addImage: path(ROOT_MODULES, '/:moduleId/image/create'),
  imageDetail: path(ROOT_MODULES, '/:moduleId/image/:imageId'),
  addVideo: path(ROOT_MODULES, '/:moduleId/video/create'),
  videoDetail: path(ROOT_MODULES, '/:moduleId/video/:videoId'),
  addDocument: path(ROOT_MODULES, '/:moduleId/document/create'),
  documentDetail: path(ROOT_MODULES, '/:moduleId/document/:documentId'),
  addAudio: path(ROOT_MODULES, '/:moduleId/audio/create'),
  audioDetail: path(ROOT_MODULES, '/:moduleId/audio/:audioId')
};

// Modules
const ROOT_QUESTIONS = PATH_MODULES.question;
export const PATH_QUESTIONS = {
  root: ROOT_QUESTIONS,
  trueFalse: path(ROOT_QUESTIONS, '/trueFalse'),
  unique: path(ROOT_QUESTIONS, '/unique'),
  multiChoice: path(ROOT_QUESTIONS, '/multiChoice'),
  classify: path(ROOT_QUESTIONS, '/classify'),
  gap: path(ROOT_QUESTIONS, '/gap'),
  picture: path(ROOT_QUESTIONS, '/picture'),
  open: path(ROOT_QUESTIONS, '/open')
};

export const getPathsForQuestions = (questionType: QuestionType) => {
  switch (questionType) {
    case QuestionType.TRUE_FALSE:
      return PATH_QUESTIONS.trueFalse;
    case QuestionType.CHECKBOX:
      return PATH_QUESTIONS.unique;
    case QuestionType.MULTIPLE_CHOICE:
      return PATH_QUESTIONS.multiChoice;
    case QuestionType.CLASSIFY_IN_ORDER:
      return PATH_QUESTIONS.classify;
    case QuestionType.TEXT_WITH_HOLE:
      return PATH_QUESTIONS.gap;
    case QuestionType.CLICKABLE_IMAGE:
      return PATH_QUESTIONS.picture;
    case QuestionType.FREE_TEXT:
      return PATH_QUESTIONS.open;
  }
};

export const pathToQuestionTypeMap: Record<string, QuestionType> = {
  [PATH_QUESTIONS.trueFalse]: QuestionType.TRUE_FALSE,
  [PATH_QUESTIONS.unique]: QuestionType.CHECKBOX,
  [PATH_QUESTIONS.multiChoice]: QuestionType.MULTIPLE_CHOICE,
  [PATH_QUESTIONS.classify]: QuestionType.CLASSIFY_IN_ORDER,
  [PATH_QUESTIONS.gap]: QuestionType.TEXT_WITH_HOLE,
  [PATH_QUESTIONS.picture]: QuestionType.CLICKABLE_IMAGE,
  [PATH_QUESTIONS.open]: QuestionType.FREE_TEXT,
};
