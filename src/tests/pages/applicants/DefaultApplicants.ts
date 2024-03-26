import { Applicant, ApplicantType } from '@services/applicants/interfaces';

export const defaultApplicant = {
  id: 1,
  profile_picture: 'defaultApplicantPicture',
  email: 'defaultApplicant@test.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  firstname: 'default',
  lastname: 'applicant',
  phone: '0123456789',
  is_active: true,
  other_data: [],
  birth_name: null,
  birth_date: '1990-01-01',
  city: 'defaultApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as Applicant;

export const blockedApplicant = {
  id: 2,
  profile_picture: 'blockedApplicantPicture',
  email: 'blockedApplicant@test.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  firstname: 'blocked',
  lastname: 'applicant',
  phone: '0123456789',
  is_active: false,
  other_data: [],
  birth_name: null,
  birth_date: '1990-01-01',
  city: 'blockedApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as Applicant;

export const unlockedApplicant = {
  id: 3,
  profile_picture: 'unlockedApplicantPicture',
  email: 'unlockedApplicant@test.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  firstname: 'unlocked',
  lastname: 'applicant',
  phone: '0123456789',
  is_active: true,
  other_data: [],
  birth_name: null,
  birth_date: '1990-01-01',
  city: 'unlockedApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as Applicant;

export const newApplicant = {
  id: 4,
  profile_picture: 'newApplicantPicture',
  email: 'newApplicant@test.fr',
  type: ApplicantType.STUDENT,
  external_id: null,
  firstname: 'new',
  lastname: 'applicant',
  phone: '0123456789',
  is_active: true,
  other_data: [],
  birth_name: null,
  birth_date: '1990-01-01',
  city: 'newApplicantCity',
  notifications: {
    app: '1',
    sms: '1',
    email: '1'
  }
} as Applicant;
