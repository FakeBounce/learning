import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_ERRORS, PATH_ROLES } from '@utils/navigation/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';
import { useEffect } from 'react';
import RolesUpdateFooter from '@src/pages/roles/roles-update/RolesUpdateFooter';
import { enqueueSnackbar } from 'notistack';
import { getRolePermissionsAction, updateRoleAction } from '@redux/actions/rolesActions';
import {
  constructPermissionsObject,
  permissionsSchema
} from '@src/pages/roles/roles-permissions/RolesPermissionsSchema';
import RolesPermissionsForm from '@src/pages/roles/roles-permissions/RolesPermissionsForm';
import { resetUpdateRoleState } from '@redux/reducers/rolesReducer';

export default function RolesPermissions() {
  // const [role, setRole] = useState<UserPermissionObject>(constructPermissionsObject());
  // @TODO rework this when the api gives a correct structure
  const temp = constructPermissionsObject();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roleId } = useParams();

  const { rolesPermissionsData } = useAppSelector((state) => state.roles.rolesPermissions);

  useEffect(() => {
    if (rolesPermissionsData) {
      // @TODO use a function to set the role with correct structure
      // setRole(rolesPermissionsData);
    }
  }, [rolesPermissionsData]);

  // Update the form if we are on the update page
  useEffect(() => {
    try {
      const roleIdToFetch = Number(roleId);
      if (!isNaN(roleIdToFetch)) {
        dispatch(getRolePermissionsAction({ roleId: roleIdToFetch }));
      } else {
        throw new Error();
      }
    } catch (_) {
      navigate(PATH_ERRORS.root);
      enqueueSnackbar(t`Le rôle n'existe pas`, { variant: 'error' });
    }
  }, []);

  const methods = useForm({
    resolver: yupResolver(permissionsSchema),
    defaultValues: temp,
    values: temp
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      await dispatch(updateRoleAction({ id: Number(roleId), permissions: data }));
      navigate(PATH_ROLES.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetUpdateRoleState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} noValidate>
        <LMSCard
          isPageCard
          contentPadding={0}
          header={<CardHeader headerText={<Trans>Gestion des permissions</Trans>} />}
          footer={<RolesUpdateFooter />} // Same as RolesUpdateFooter because it's also an update page
        >
          <RolesPermissionsForm />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
