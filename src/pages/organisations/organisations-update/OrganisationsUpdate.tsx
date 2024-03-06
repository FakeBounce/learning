import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateOrganisations, getSingleOrganisation } from '@redux/reducers/organisationsReducer';
import { LMSCard } from '@src/components/lms';
import OrganisationsUpdateFooter from '@src/pages/organisations/organisations-update/OrganisationsUpdateFooter';
import OrganisationsUpdateForm from '@src/pages/organisations/organisations-update/OrganisationsUpdateForm';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

const UpdateOrganisationSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom est requis`),
  address: Yup.string().required(t`L'adresse est requise`)
});

const defaultValues = {
  name: '',
  address: ''
};

interface UpdateOrganisationForm {
  name: string;
  address: string;
  logo?: string;
}

export default function OrganisationsUpdate() {
  const [organisation, setOrganisation] = useState<UpdateOrganisationForm>(defaultValues);
  const [image, setImage] = useState<string | File>('');
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const organisationId = Number(pathname.split('/').pop());

  const { currentOrganisationData } = useAppSelector(
    (state) => state.organisations.currentOrganisation
  );

  // Update the form if we are on the update page
  useEffect(() => {
    if (pathname.includes('update')) {
      if (organisationId) {
        dispatch(getSingleOrganisation(organisationId));
      }
    }
  }, []);

  useEffect(() => {
    if (currentOrganisationData) {
      setOrganisation(currentOrganisationData);
      setImage(currentOrganisationData.logo);
    }
  }, [currentOrganisationData]);

  const methods = useForm({
    resolver: yupResolver(UpdateOrganisationSchema),
    defaultValues: organisation,
    values: organisation
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: UpdateOrganisationForm) => {
    let newOrganisationValues = {};

    // We should map on UpdateOrganisationForm to check if the data has changed instead of doing ifs
    if (data.name !== organisation.name) {
      newOrganisationValues = { name: data.name };
    }
    if (data.address !== organisation.address) {
      // arguments = { ...arguments, address: data.address };
      // @todo - Use google API on front and not through the backend to prevent multiplicating requests
      newOrganisationValues = {
        ...newOrganisationValues,
        address_id: 'ChIJ-U_newOxthIRZKI1ypcmSB8'
      };
    }
    if (image !== organisation.logo) {
      newOrganisationValues = { ...newOrganisationValues, logo: image };
    }

    if (Object.keys(newOrganisationValues).length > 0) {
      // Handle update with image
      dispatch(updateOrganisations({ id: organisationId, ...newOrganisationValues }));
    } else {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
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
                <Trans>Modifier une organisation</Trans>
              </Typography>
            }
            footer={<OrganisationsUpdateFooter />}
          >
            <OrganisationsUpdateForm image={image} setImage={setImage} />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
