import { Applicant, ApplicantFromApi, ApplicantType } from '@services/applicants/interfaces';

export const defaultApplicant = {
  id: 1,
  profilePicture: 'defaultApplicantPicture',
  email: 'defaultApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: null,
  firstname: 'default',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: true,
  birthName: null,
  birthDate: '1990-01-01',
  city: 'defaultApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as ApplicantFromApi;

export const blockedApplicant = {
  id: 2,
  profilePicture: 'blockedApplicantPicture',
  email: 'blockedApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: null,
  firstname: 'blocked',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: false,
  birthName: null,
  birthDate: '1990-01-01',
  city: 'blockedApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as ApplicantFromApi;

export const unlockedApplicant = {
  id: 3,
  profilePicture: 'unlockedApplicantPicture',
  email: 'unlockedApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: null,
  firstname: 'unlocked',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: true,
  birthName: null,
  birthDate: '1990-01-01',
  city: 'unlockedApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as ApplicantFromApi;

export const newApplicant = {
  id: 4,
  profilePicture: 'newApplicantPicture',
  email: 'newApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: null,
  firstname: 'new',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: true,
  birthName: null,
  birthDate: '1990-01-01',
  city: 'newApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as ApplicantFromApi;

export const stateApplicant = {
  id: 1,
  profilePicture: 'stateApplicantPicture',
  email: 'stateApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: null,
  firstname: 'state',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: true,
  birthName: null,
  birthDate: '1990-01-01',
  city: 'stateApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as Applicant;

export const stateApplicantDisabled = {
  id: 2,
  profilePicture: 'stateApplicantPicture',
  email: 'stateApplicant@test.fr',
  type: ApplicantType.STUDENT,
  externalId: '1',
  firstname: 'state',
  lastname: 'applicant',
  phone: '0123456789',
  isActive: false,
  birthName: 'stateApplicantBirthName',
  birthDate: '1990-01-01',
  city: 'stateApplicantCity',
  notifications: {
    app: '0',
    sms: '0',
    email: '0'
  }
} as Applicant;

export const singleApplicant = {
  id: 5,
  profile_picture: 'singleApplicantPicture',
  email: 'singleApplicant@email.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  isActive: true,
  notifications: {
    app: '1',
    sms: '1',
    email: '0'
  },
  current_values: {
    firstname: 'single',
    lastname: 'applicant',
    phone: '0123456789',
    birthName: null,
    birthDate: '1990-01-01',
    city: 'singleApplicantCity'
  }
};
