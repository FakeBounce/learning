import { t } from '@lingui/macro';
import * as Yup from 'yup';
import { Applicant } from '@services/applicants/interfaces';

export const updateExternalTesterSchema = Yup.object().shape({
  lastname: Yup.string().required(t`Le nom de famille est requis`),
  firstname: Yup.string().required(t`Le prénom est requis`),
  phone: Yup.string()
    .optional()
    .matches(/^$|^\+?[0-9]{8,15}$/, t`Le numéro de téléphone est invalide`),
  externalId: Yup.string().optional(),
  groups: Yup.array()
    .of(Yup.string())
    .required(t`Au moins un groupe est requis`),
  email: Yup.string()
    .required(t`L'email est requis`)
    .email(t`L'email est invalide`)
  // groups: Yup.array().required(t`Le nom de famille est requis`),
});

export const updateExternalTesterFormDefaultValues = {
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  externalId: '',
  groups: []
};

export interface UpdateExternalTesterForm {
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  externalId?: string;
  groups: (string | undefined)[];
}

export const populateUpdateExternalTesterForm = (applicant: Applicant) => {
  return {
    firstname: applicant.firstname,
    lastname: applicant.lastname,
    email: applicant.email,
    phone: applicant.phone || '',
    externalId: applicant.externalId || '',
    groups: []
  };
};
