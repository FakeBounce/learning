import { t } from '@lingui/macro';
import * as Yup from 'yup';
import { Applicant } from '@services/applicants/interfaces';
import { format } from 'date-fns';
import { BasicOption } from '@services/interfaces';
import { Group } from '@services/groups/interfaces';

export const updateApplicantSchema = Yup.object().shape({
  lastname: Yup.string().required(t`Le nom de famille est requis`),
  firstname: Yup.string().required(t`Le prénom est requis`),
  phone: Yup.string()
    .optional()
    .matches(/^$|^\+?[0-9]{8,15}$/, t`Le numéro de téléphone est invalide`),
  externalId: Yup.string().optional(),
  birthName: Yup.string().optional(),
  city: Yup.string().optional(),
  groupsId: Yup.array()
    .of(Yup.object().shape({ value: Yup.string().required(), label: Yup.string().required() }))
    .optional(),
  email: Yup.string()
    .required(t`L'email est requis`)
    .email(t`L'email est invalide`),
  birthDate: Yup.mixed<Date | string>()
    .optional()
    .test('is-valid-date', t`Le format est invalide`, (value) => {
      if (!value) return true; // Allow empty string if field is not required
      // Check if the value is a valid date
      return !isNaN(Date.parse(value.toString()));
    })
    .transform((value) => {
      if (!isNaN(Date.parse(value))) {
        return format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
      }
      return value;
    }),
  notifications: Yup.object().shape({
    email: Yup.boolean().required(t`La notification email est requis`),
    sms: Yup.boolean().required(t`La notification sms est requise`),
    app: Yup.boolean().required(t`La notification app est requise`)
  }),
  profilePicture: Yup.mixed<File | string>()
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
  groupsId: [],
  notifications: {
    email: true,
    sms: true,
    app: true
  },
  profilePicture: ''
} as UpdateApplicantForm;

export interface UpdateApplicantForm {
  lastname: string;
  firstname: string;
  email: string;
  birthDate?: string | Date;
  phone?: string;
  externalId?: string;
  birthName?: string;
  city?: string;
  profilePicture?: File | string | undefined;
  groupsId?: BasicOption[];
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
    birthDate: applicant.birthDate ? new Date(applicant.birthDate) : '',
    phone: applicant.phone || '',
    city: applicant.city || '',
    externalId: applicant.externalId || '',
    birthName: applicant.birthName || '',
    profilePicture: applicant.profilePicture || '',
    notifications: {
      email: applicant.notifications?.email === true,
      sms: applicant.notifications?.sms === true,
      app: applicant.notifications?.app === true
    },
    groupsId: applicant.groups
      ? applicant.groups.map((group: Group) => ({ value: group.id.toString(), label: group.name }))
      : []
  } as UpdateApplicantForm;
};
