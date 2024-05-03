import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_ROLES } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';
import { enqueueSnackbar } from 'notistack';
import RolesCreateFooter from '@src/pages/roles/roles-create/RolesCreateFooter';
import { createRoleAction } from '@redux/actions/rolesActions';
import { resetRolesState } from '@redux/reducers/rolesReducer';
import RolesUsersForm from '@src/pages/roles/roles-form/RolesUsersForm';
import {
  RoleForm,
  roleFormDefaultValues,
  roleFormSchema
} from '@src/pages/roles/roles-form/RolesFormSchema';

export default function RolesCreate() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(roleFormSchema),
    defaultValues: { ...roleFormDefaultValues }
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: RoleForm) => {
    try {
      const createRoleRequest = {
        name: data.name
      } as RoleForm;

      if (data.description && data.description !== '') {
        createRoleRequest.description = data.description;
      }

      if (data.usersId && data.usersId.length > 0) {
        createRoleRequest.usersId = data.usersId;
      }
      if (data.groupsId && data.groupsId.length > 0) {
        createRoleRequest.groupsId = data.groupsId;
      }

      await dispatch(createRoleAction(createRoleRequest));
      navigate(PATH_ROLES.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetRolesState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} noValidate>
        <LMSCard
          isPageCard
          contentPadding={0}
          header={<CardHeader headerText={<Trans>Ajouter un rôle</Trans>} />}
          footer={<RolesCreateFooter />}
        >
          <RolesUsersForm />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
