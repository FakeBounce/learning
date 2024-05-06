import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_ROLES } from '@utils/navigation/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';
import { enqueueSnackbar } from 'notistack';
import { updateRoleAction } from '@redux/actions/rolesActions';
import { resetRolesState } from '@redux/reducers/rolesReducer';
import RolesUsersForm from '@src/pages/roles/roles-form/RolesUsersForm';
import {
  RoleForm,
  roleFormDefaultValues,
  roleFormSchema
} from '@src/pages/roles/roles-form/RolesFormSchema';
import { useEffect, useState } from 'react';
import RolesUpdateFooter from '@src/pages/roles/roles-update/RolesUpdateFooter';

export default function RolesUpdate() {
  const [role, setRole] = useState<RoleForm>(roleFormDefaultValues);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roleId } = useParams();

  const { currentRoleData } = useAppSelector((state) => state.roles.currentRole);

  useEffect(() => {
    if (currentRoleData) {
      setRole(currentRoleData);
    }
  }, [currentRoleData]);

  // Update the form if we are on the update page
  useEffect(() => {
    if (currentRoleData?.id !== Number(roleId) && currentRoleData !== null) {
      navigate(PATH_ROLES.root);
    } else if (currentRoleData === null) {
      navigate(PATH_ROLES.root);
    }
  }, []);

  const methods = useForm({
    resolver: yupResolver(roleFormSchema),
    defaultValues: role,
    values: { ...role, description: role.description ?? '' }
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: RoleForm) => {
    try {
      const updateRoleRequest = {} as RoleForm;

      Object.keys(dirtyFields).forEach((key) => {
        const formKey = key as keyof RoleForm;
        const value = data[formKey];

        // Ensuring we only assign values that are not undefined
        if (value !== undefined) {
          // Narrowing down the type dynamically and safely using type assertion
          switch (formKey) {
            case 'name':
            case 'description':
              if (typeof value === 'string') {
                updateRoleRequest[formKey] = value;
              }
              break;
            case 'usersId':
            case 'groupsId':
              if (Array.isArray(value)) {
                updateRoleRequest[formKey] = value;
              }
              break;
          }
        }
      });

      if (Object.keys(updateRoleRequest).length === 0) {
        enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
        return;
      }

      await dispatch(updateRoleAction({ id: Number(roleId), ...updateRoleRequest }));
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
          header={<CardHeader headerText={<Trans>Modifier un rôle</Trans>} />}
          footer={<RolesUpdateFooter />}
        >
          <RolesUsersForm isEditing />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
