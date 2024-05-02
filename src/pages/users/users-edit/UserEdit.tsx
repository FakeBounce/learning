import * as Yup from 'yup';
import { t, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LMSCard } from '@src/components/lms';
import { Box } from '@mui/material';
import UserEditForm from '@src/pages/users/users-edit/UserEditForm';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { getSingleUser, updateUser } from '@redux/actions/usersActions';
import { PATH_ERRORS, PATH_USERS } from '@utils/navigation/paths';
import CardHeader from '@src/components/cards/CardHeader';
import CardFooter from '@src/components/cards/CardFooter';

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

  const { updatedUserLoading } = useAppSelector((state) => state.users.updatedUser);
  const [user, setUser] = useState<EditUserForm>(defaultValues);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = Number(pathname.split('/').pop());

  const { singleUserData } = useAppSelector((state) => state.users.singleUser);

  // Update the form if we are on the update page
  useEffect(() => {
    if (singleUserData?.id !== Number(userId)) {
      try {
        const applicantIdToFetch = Number(userId);
        if (!isNaN(applicantIdToFetch)) {
          dispatch(getSingleUser(applicantIdToFetch));
        } else {
          throw new Error();
        }
      } catch (_) {
        navigate(PATH_ERRORS.root);
        enqueueSnackbar(t`L'utilisateur n'existe pas`, { variant: 'error' });
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
      try {
        await dispatch(updateUser({ id: userId, ...newUserData }));
        returnToProfile();
      } catch (error) {
        enqueueSnackbar(error as string, { variant: 'error' });
      }
    } else {
      enqueueSnackbar(t`Aucune modification n'a été apportée`, { variant: 'warning' });
    }
  };

  const returnToProfile = () => {
    navigate(generatePath(PATH_USERS.profile, { userId: String(userId) }));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box px={[0, 2]} display="flex">
          <LMSCard
            isPageCard
            header={<CardHeader headerText={<Trans>Modifier un utilisateur</Trans>} />}
            footer={<CardFooter isLoading={updatedUserLoading} cancelAction={returnToProfile} />}
          >
            <UserEditForm control={control} />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
