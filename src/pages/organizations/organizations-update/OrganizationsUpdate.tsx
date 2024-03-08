import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { updateOrganizations, getSingleOrganization } from '@redux/reducers/organizationsReducer';
import { LMSCard } from '@src/components/lms';
import OrganizationsUpdateFooter from '@src/pages/organizations/organizations-update/OrganizationsUpdateFooter';
import OrganizationsUpdateForm from '@src/pages/organizations/organizations-update/OrganizationsUpdateForm';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

const updateOrganizationschema = Yup.object().shape({
  name: Yup.string().required(t`Le nom est requis`),
  address: Yup.string().required(t`L'adresse est requise`)
});

const defaultValues = {
  name: '',
  address: ''
};

interface UpdateOrganizationForm {
  name: string;
  address: string;
  logo?: string;
}

export default function OrganizationsUpdate() {
  const [organization, setOrganization] = useState<UpdateOrganizationForm>(defaultValues);
  const [image, setImage] = useState<string | File>('');
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const organizationId = Number(pathname.split('/').pop());

  const { currentOrganizationData } = useAppSelector(
    (state) => state.organizations.currentOrganization
  );

  // Update the form if we are on the update page
  useEffect(() => {
    if (pathname.includes('update')) {
      if (organizationId) {
        dispatch(getSingleOrganization(organizationId));
      }
    }
  }, []);

  useEffect(() => {
    if (currentOrganizationData) {
      setOrganization(currentOrganizationData);
      setImage(currentOrganizationData.logo);
    }
  }, [currentOrganizationData]);

  const methods = useForm({
    resolver: yupResolver(updateOrganizationschema),
    defaultValues: organization,
    values: organization
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: UpdateOrganizationForm) => {
    let newOrganizationValues = {};

    // We should map on UpdateOrganizationForm to check if the data has changed instead of doing ifs
    if (data.name !== organization.name) {
      newOrganizationValues = { name: data.name };
    }
    if (data.address !== organization.address) {
      // arguments = { ...arguments, address: data.address };
      // @todo - Use google API on front and not through the backend to prevent multiplicating requests
      newOrganizationValues = {
        ...newOrganizationValues,
        address_id: 'ChIJ-U_newOxthIRZKI1ypcmSB8'
      };
    }
    if (image !== organization.logo) {
      newOrganizationValues = { ...newOrganizationValues, logo: image };
    }

    if (Object.keys(newOrganizationValues).length > 0) {
      // Handle update with image
      dispatch(updateOrganizations({ id: organizationId, ...newOrganizationValues }));
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
            footer={<OrganizationsUpdateFooter />}
          >
            <OrganizationsUpdateForm image={image} setImage={setImage} />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
