import * as Yup from 'yup';
import { t } from '@lingui/macro';

export const roleFormSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom du groupe est requis`),
  description: Yup.string().optional(),
  usersId: Yup.array().of(Yup.number().required()).optional(),
  groupsId: Yup.array().of(Yup.number().required()).optional()
});

export const roleFormDefaultValues: RoleForm = {
  name: '',
  description: '',
  usersId: [],
  groupsId: []
};

export interface RoleForm {
  name: string;
  description?: string;
  usersId?: number[];
  groupsId?: number[];
}
