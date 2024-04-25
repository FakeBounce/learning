import { yupResolver } from '@hookform/resolvers/yup';
import { t, Trans } from '@lingui/macro';
import { useAppDispatch } from '@redux/hooks';
import { createOrganizations } from '@redux/actions/organizationsActions';
import { LMSCard } from '@src/components/lms';
import OrganizationsCreateFooter from '@src/pages/organizations/organizations-create/OrganizationsCreateFooter';
import OrganizationsCreateForm from '@src/pages/organizations/organizations-create/OrganizationsCreateForm';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CardHeader from '@src/components/cards/CardHeader';
import { resetOrganizationState } from '@redux/reducers/organizationsReducer';

const createOrganizationschema = Yup.object().shape({
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

interface CreateOrganizationForm {
  name: string;
  login: string;
  address: string;
  adminLastName: string;
  adminFirstName: string;
  adminEmail: string;
}

export default function OrganizationsCreate() {
  const [image, setImage] = useState<string | File>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(createOrganizationschema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: CreateOrganizationForm) => {
    if (image === '') {
      enqueueSnackbar(t`Veuillez ajouter un logo`, { variant: 'error' });
    } else {
      try {
        // Handle add
        await dispatch(
          createOrganizations({
            logo: image,
            name: data.name,
            // @todo - Use google API on front and not through the backend to prevent multiplicating requests
            // So for now we use this default addressId
            addressId: 'ChIJ-U_newOxthIRZKI1ypcmSB8',
            useDoubleAuth: false,
            clientAdmin: {
              firstname: data.adminFirstName,
              lastname: data.adminLastName,
              email: data.adminEmail,
              login: data.login
            }
          })
        );
        navigate(PATH_ORGANIZATIONS.root);
      } catch (error) {
        enqueueSnackbar(error as string, { variant: 'error' });
        dispatch(resetOrganizationState());
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <LMSCard
          isPageCard
          header={<CardHeader headerText={<Trans>Créer une organization</Trans>} />}
          footer={<OrganizationsCreateFooter />}
        >
          <OrganizationsCreateForm image={image} setImage={setImage} />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
