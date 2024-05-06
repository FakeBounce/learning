import { Applicant, ApplicantFromApi, ApplicantType } from '@services/applicants/interfaces';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

export const defaultTester = {
  id: 1,
  profilePicture: 'defaultExternalTesterPicture',
  email: 'defaultTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'default',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true
} as ApplicantFromApi;

export const blockedTester = {
  id: 2,
  profilePicture: 'blockedTesterPicture',
  email: 'blockedTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'blocked',
  lastname: 'tester',
  phone: '0123456789',
  isActive: false
} as ApplicantFromApi;

export const unlockedTester = {
  id: 3,
  profilePicture: 'unlockedTesterPicture',
  email: 'unlockedTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'unlocked',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true
} as ApplicantFromApi;

export const newTester = {
  id: 4,
  profilePicture: 'newTesterPicture',
  email: 'newTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'new',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true
} as ApplicantFromApi;

export const stateTester = {
  id: 1,
  profilePicture: 'stateTesterPicture',
  email: 'stateTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: null,
  firstname: 'state',
  lastname: 'tester',
  phone: '0123456789',
  isActive: true,
  groups: [defaultGroup]
} as Applicant;

export const stateTesterDisabled = {
  id: 2,
  profilePicture: 'stateTesterPicture',
  email: 'stateTester@test.fr',
  type: ApplicantType.TESTER,
  externalId: '1',
  firstname: 'state',
  lastname: 'tester',
  phone: '0123456789',
  isActive: false,
  groups: [defaultGroup]
} as Applicant;

export const singleTester = {
  id: 5,
  profile_picture: 'singleTesterPicture',
  email: 'singleTester@email.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  isActive: true,
  groups: [defaultGroup],
  current_values: {
    firstname: 'single',
    lastname: 'tester',
    phone: '0123456789'
  }
};
