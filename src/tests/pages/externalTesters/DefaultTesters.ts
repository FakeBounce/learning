import { Applicant, ApplicantFromApi, ApplicantType } from '@services/applicants/interfaces';

export const defaultTester = {
  id: 1,
  profile_picture: 'defaultExternalTesterPicture',
  email: 'defaultTester@test.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  firstname: 'default',
  lastname: 'tester',
  phone: '0123456789',
  is_active: true
} as ApplicantFromApi;

export const blockedTester = {
  id: 2,
  profile_picture: 'blockedTesterPicture',
  email: 'blockedTester@test.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  firstname: 'blocked',
  lastname: 'tester',
  phone: '0123456789',
  is_active: false
} as ApplicantFromApi;

export const unlockedTester = {
  id: 3,
  profile_picture: 'unlockedTesterPicture',
  email: 'unlockedTester@test.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  firstname: 'unlocked',
  lastname: 'tester',
  phone: '0123456789',
  is_active: true
} as ApplicantFromApi;

export const newTester = {
  id: 4,
  profile_picture: 'newTesterPicture',
  email: 'newTester@test.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  firstname: 'new',
  lastname: 'tester',
  phone: '0123456789',
  is_active: true
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
  isActive: true
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
  isActive: false
} as Applicant;

export const singleTester = {
  id: 5,
  profile_picture: 'singleTesterPicture',
  email: 'singleTester@email.fr',
  type: ApplicantType.TESTER,
  external_id: null,
  is_active: true,
  current_values: {
    firstname: 'single',
    lastname: 'tester',
    phone: '0123456789'
  }
};
