import {
  Applicant,
  ApplicantForBulk,
  ApplicantFromApi,
  ApplicantType
} from '@services/applicants/interfaces';
import { defaultGroup } from '@src/tests/pages/groups/DefaultGroup';

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
    app: true,
    sms: true,
    email: true
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
    app: true,
    sms: true,
    email: true
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
    app: true,
    sms: true,
    email: true
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
    app: true,
    sms: true,
    email: true
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
    app: true,
    sms: true,
    email: true
  },
  groups: [defaultGroup]
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
    app: false,
    sms: false,
    email: false
  },
  groups: [defaultGroup]
} as Applicant;

export const singleApplicant = {
  id: 5,
  profile_picture: 'singleApplicantPicture',
  email: 'singleApplicant@email.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  isActive: true,
  notifications: {
    app: true,
    sms: true,
    email: false
  },
  current_values: {
    firstname: 'single',
    lastname: 'applicant',
    phone: '0123456789',
    birthName: null,
    birthDate: '1990-01-01',
    city: 'singleApplicantCity'
  },
  groups: [defaultGroup]
};

export const conflictedApplicant = {
  id: 8,
  profile_picture: 'conflictedApplicantPicture',
  email: 'conflictedApplicant@email.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  isActive: true,
  notifications: {
    app: true,
    sms: true,
    email: false
  },
  current_values: {
    firstname: 'cfirstname',
    lastname: 'clastname',
    phone: '0123456789',
    birthName: null,
    birthDate: '1990-01-01',
    city: 'conflictedApplicantCity'
  },
  conflicts: {
    firstname: 'conflictedFirstname',
    lastname: 'conflictedLastname'
  },
  groups: [defaultGroup]
};

export const validRowsForApplicantBulk = [
  {
    externalId: 'POIU1',
    firstname: 'Améthyste',
    lastname: 'Supernom',
    email: 'superam@kyste.fr',
    phone: '0987654321',
    city: 'Poiuytreza',
    birthDate: '03/03/1090',
    birthName: 'Poulop'
  },
  {
    externalId: 'LKDAL209',
    firstname: 'Parapluie',
    lastname: 'Lenom',
    email: 'para@pluie.com',
    phone: '',
    city: 'Moiute',
    birthDate: '02/05/1976',
    birthName: 'Teebop'
  },
  {
    externalId: '',
    firstname: 'yaller',
    lastname: 'jdois',
    email: 'jdoisyaller@vite.com',
    phone: '',
    city: 'HOHOHO',
    birthDate: '01/23/1003',
    birthName: ''
  }
] as ApplicantForBulk[];

export const faultyRowsForApplicantBulk = [
  {
    externalId: '',
    email: 'faultyrow@bulk.fr',
    firstname: 'faulty',
    lastname: 'row',
    phone: 'IF',
    birthName: '',
    birthDate: 'MD',
    city: 'faultyRowCity'
  }
] as ApplicantForBulk[];

export const ApplicantBulkFromApi = [
  {
    type: ApplicantType.STUDENT,
    isActive: true,
    externalId: 'POIU1',
    firstname: 'Améthyste',
    lastname: 'Supernom',
    email: 'superam@kyste.fr',
    phone: '0987654321',
    city: 'Poiuytreza',
    birthDate: '03/03/1090',
    birthName: 'Poulop'
  },
  {
    type: ApplicantType.STUDENT,
    isActive: true,
    external_id: 'LKDAL209',
    firstname: 'Parapluie',
    lastname: 'Lenom',
    email: 'para@pluie.com',
    phone: '',
    city: 'Moiute',
    birthDate: '02/05/1976',
    birthName: 'Teebop'
  },
  {
    type: ApplicantType.STUDENT,
    isActive: true,
    externalId: '',
    firstname: 'yaller',
    lastname: 'jdois',
    email: 'jdoisyaller@vite.com',
    phone: '',
    city: 'HOHOHO',
    birthDate: '01/23/1003',
    birthName: ''
  }
] as ApplicantFromApi[];
