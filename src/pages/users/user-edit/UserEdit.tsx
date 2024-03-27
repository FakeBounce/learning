import * as Yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LMSCard } from '@src/components/lms';
import { Box, Typography } from '@mui/material';
import UserEditForm from '@src/pages/users/user-edit/UserEditForm';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useLocation } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { getSingleUser, updateUser } from '@redux/reducers/usersReducer';
import UserEditFooter from '@src/pages/users/user-edit/UserEditFooter';

const EditUserSchema = Yup.object().shape({
  lastname: Yup.string().required(t`Le nom est requis`),
  firstname: Yup.string().required(t`Le prénom est requis`),
  email: Yup.string().required(t`L'email est requis`),
  login: Yup.string().required(t`Le login est requis`),
  useDoubleAuth: Yup.boolean().required(t`La double authentification est requise`)
});

const defaultValues = {
  lastname: '',
  firstname: '',
  email: '',
  login: '',
  useDoubleAuth: false
};

export interface EditUserForm {
  lastname: string;
  firstname: string;
  email: string;
  login: string;
  useDoubleAuth: boolean;
}

export default function UserEdit() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<EditUserForm>(defaultValues);

  const { pathname } = useLocation();
  const userId = Number(pathname.split('/').pop());

  const { singleUserData } = useAppSelector((state) => state.users.singleUser);

  // Update the form if we are on the update page
  useEffect(() => {
    if (pathname.includes('edit')) {
      if (userId) {
        dispatch(getSingleUser(userId));
      }
    }
  }, []);

  useEffect(() => {
    if (singleUserData) {
      setUser(singleUserData);
    }
  }, [singleUserData]);

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues: user,
    values: user
  });

  const {
    handleSubmit,
    control,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: EditUserForm) => {
    const newUserData = {} as Record<string, any>;

    Object.keys(dirtyFields).forEach((key) => {
      newUserData[key] = data[key as keyof EditUserForm];
    });

    if (Object.keys(newUserData).length > 0) {
      dispatch(updateUser({ id: userId, ...newUserData }));
    } else {
      enqueueSnackbar(t`Aucune modification n'a été apportée`, { variant: 'warning' });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box px={[0, 2]} display="flex">
          <LMSCard
            cardCss={{ padding: 3 }}
            header={
              <Typography variant="h4" sx={{ fontWeight: 'normal' }}>
                <Trans>Modifier un utilisateur</Trans>
              </Typography>
            }
            footer={<UserEditFooter />}
          >
            <UserEditForm control={control} />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
