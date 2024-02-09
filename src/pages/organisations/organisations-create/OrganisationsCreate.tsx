import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { createOrganisations } from '@redux/reducers/organisationsReducer';
import { LMSCard } from '@src/components/lms';
import OrganisationsCreateFooter from '@src/pages/organisations/organisations-create/OrganisationsCreateFooter.tsx';
import OrganisationsCreateForm from '@src/pages/organisations/organisations-create/OrganisationsCreateForm.tsx';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AddOrganisationSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom est requis`),
  login: Yup.string().required(t`L'identifiant est requis`),
  address: Yup.string().required(t`L'adresse est requise`),
  adminLastName: Yup.string().required(t`Le nom de l'admin est requis`),
  adminFirstName: Yup.string().required(t`Le prénom de l'admin est requis`),
  adminEmail: Yup.string()
    .email(t`L'email de l'admin est invalide`)
    .required(t`L'email de l'admin est requis`)
});

const defaultValues = {
  name: '',
  login: '',
  address: '',
  adminLastName: '',
  adminFirstName: '',
  adminEmail: ''
};
interface AddOrganisationForm {
  name: string;
  login: string;
  address: string;
  adminLastName: string;
  adminFirstName: string;
  adminEmail: string;
}

export default function OrganisationsCreate() {
  const [image, setImage] = useState<'' | File>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log('location', pathname);

  const { organisationCreateData } = useAppSelector(
    (state) => state.organisations.organisationCreate
  );

  useEffect(() => {
    if (organisationCreateData) {
      navigate(PATH_ORGANISATIONS.root);
    }
  }, [organisationCreateData]);

  const methods = useForm({
    resolver: yupResolver(AddOrganisationSchema),
    defaultValues
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: AddOrganisationForm) => {
    if (image !== '') {
      // Handle add
      dispatch(
        createOrganisations({
          logo: image,
          name: data.name,
          // @todo - Use google API on front and not through the backend to prevent multiplicating requests
          // So for now we use this default address_id
          address_id: 'ChIJ-U_newOxthIRZKI1ypcmSB8',
          use_double_auth: 0,
          client_admin: {
            firstname: data.adminFirstName,
            lastname: data.adminLastName,
            email: data.adminEmail,
            login: data.login
          }
        })
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box px={[0, 2]} display="flex">
          <LMSCard
            cardCss={{ maxWidth: '100%' }}
            header={
              <Typography variant="h5">
                <Trans>Créer une organisation</Trans>
              </Typography>
            }
            footer={<OrganisationsCreateFooter />}
          >
            <OrganisationsCreateForm setImage={setImage} />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
