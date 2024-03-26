import { t } from '@lingui/macro';
import * as Yup from 'yup';
import { Applicant } from '@services/applicants/interfaces';

export const updateApplicantSchema = Yup.object().shape({
  lastname: Yup.string().required(t`Le nom de famille est requis`),
  firstname: Yup.string().required(t`Le prénom est requis`),
  phone: Yup.string().optional(),
  externalId: Yup.string().optional(),
  birthName: Yup.string().optional(),
  city: Yup.string().optional(),
  groups: Yup.array()
    .of(Yup.string())
    .required(t`Au moins un groupe est requis`),
  email: Yup.string()
    .required(t`L'email est requis`)
    .email(t`L'email est invalide`),
  birthDate: Yup.string()
    .transform((value) => {
      return value ? new Date(value).toLocaleDateString() : value;
    })
    .required(t`La date de naissance est requise`),
  // groups: Yup.array().required(t`Le nom de famille est requis`),
  notifications: Yup.object().shape({
    email: Yup.boolean().required(t`La notification email est requis`),
    sms: Yup.boolean().required(t`La notification sms est requise`),
    app: Yup.boolean().required(t`La notification app est requise`)
  }),
  profilePicture: Yup.mixed<File | string>()
    .test(
      'fileSize',
      t`Le fichier est trop volumineux`,
      (value: File | string | undefined | null) => {
        if (!value) return true; // no file to upload
        if (typeof value === 'string') return true; // no file to upload
        return value?.size <= 200000;
      }
    )
    .required(t`Le fichier est requis`)
});

export const updateApplicantFormDefaultValues = {
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  externalId: '',
  birthName: '',
  birthDate: '',
  city: '',
  groups: [],
  notifications: {
    email: true,
    sms: true,
    app: true
  },
  profilePicture: ''
};

export interface UpdateApplicantForm {
  lastname: string;
  firstname: string;
  email: string;
  birthDate: string;
  phone?: string;
  externalId?: string;
  birthName?: string;
  city?: string;
  profilePicture: NonNullable<File | string | undefined>;
  groups: (string | undefined)[];
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
}

export const populateUpdateApplicantForm = (applicant: Applicant) => {
  return {
    firstname: applicant.firstname,
    lastname: applicant.lastname,
    email: applicant.email,
    birthDate: new Date(applicant.birthDate).toLocaleDateString(),
    phone: applicant.phone || '',
    city: applicant.city || '',
    externalId: applicant.externalId || '',
    birthName: applicant.birthName || '',
    profilePicture: applicant.profilePicture || '',
    notifications: {
      email: applicant.notifications.email === '1',
      sms: applicant.notifications.sms === '1',
      app: applicant.notifications.app === '1'
    },
    groups: []
  };
};
