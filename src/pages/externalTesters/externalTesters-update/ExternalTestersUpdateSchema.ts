import { t } from '@lingui/macro';
import * as Yup from 'yup';
import { Applicant } from '@services/applicants/interfaces';
import { BasicOption } from '@services/interfaces';
import { Group } from '@services/groups/interfaces';

export const updateExternalTesterSchema = Yup.object().shape({
  lastname: Yup.string().required(t`Le nom de famille est requis`),
  firstname: Yup.string().required(t`Le prénom est requis`),
  phone: Yup.string()
    .optional()
    .matches(/^$|^\+?[0-9]{8,15}$/, t`Le numéro de téléphone est invalide`),
  externalId: Yup.string().optional(),
  groupsId: Yup.array()
    .of(Yup.object().shape({ value: Yup.string().required(), label: Yup.string().required() }))
    .optional(),
  email: Yup.string()
    .required(t`L'email est requis`)
    .email(t`L'email est invalide`)
});

export const updateExternalTesterFormDefaultValues = {
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  externalId: '',
  groupsId: []
};

export interface UpdateExternalTesterForm {
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  externalId?: string;
  groupsId?: BasicOption[];
}

export const populateUpdateExternalTesterForm = (applicant: Applicant) => {
  return {
    firstname: applicant.firstname,
    lastname: applicant.lastname,
    email: applicant.email,
    phone: applicant.phone || '',
    externalId: applicant.externalId || '',
    groupsId: applicant.groups
      ? applicant.groups.map((group: Group) => ({ value: group.id.toString(), label: group.name }))
      : []
  };
};
