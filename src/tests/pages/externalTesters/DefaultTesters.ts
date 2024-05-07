import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';
import { Applicant, ApplicantType } from '@services/applicants/interfaces';

export const defaultTester: Applicant = {
  id: 1,
  profilePicture: 'defaultExternalTesterPicture',
  email: 'defaultTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'default',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const blockedTester: Applicant = {
  id: 2,
  profilePicture: 'blockedTesterPicture',
  email: 'blockedTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'blocked',
  lastname: 'tester',
  phone: '0123456789',
  isActive: false,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const unlockedTester: Applicant = {
  id: 3,
  profilePicture: 'unlockedTesterPicture',
  email: 'unlockedTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'unlocked',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const newTester: Applicant = {
  id: 4,
  profilePicture: 'newTesterPicture',
  email: 'newTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'new',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const stateTester: Applicant = {
  id: 1,
  profilePicture: 'stateTesterPicture',
  email: 'stateTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'state',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const stateTesterDisabled: Applicant = {
  id: 2,
  profilePicture: 'stateTesterPicture',
  email: 'stateTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: '1',
  firstname: 'state',
  lastname: 'tester',
  phone: '0123456789',
  isActive: false,
  groups: [defaultGroup],
  conflicts: {},
  otherData: []
};

export const singleTester: Applicant = {
  id: 5,
  profilePicture: 'singleTesterPicture',
  email: 'singleTester@email.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  isActive: true,
  groups: [defaultGroup],
  firstname: 'single',
  lastname: 'tester',
  phone: '0123456789',
  conflicts: {},
  otherData: []
};

export const conflictedTester: Applicant = {
  id: 8,
  profilePicture: 'conflictedTesterPicture',
  email: 'conflictedTester@email.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  isActive: true,
  groups: [defaultGroup],
  firstname: 'confli',
  lastname: 'ctedTester',
  phone: '0123456789',
  conflicts: {
    firstname: 'conflictedTeserFirstname',
    lastname: 'conflictedTesterLastname'
  },
  otherData: []
};
