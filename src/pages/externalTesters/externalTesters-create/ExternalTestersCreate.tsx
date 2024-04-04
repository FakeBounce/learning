import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { createApplicant } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ApplicantType, CreateApplicantRequest } from '@services/applicants/interfaces';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { resetCreatingApplicant } from '@redux/reducers/applicantsReducer';
import ExternalTestersCreateFooter from '@src/pages/externalTesters/externalTesters-create/ExternalTestersCreateFooter';
import {
  UpdateExternalTesterForm,
  updateExternalTesterFormDefaultValues,
  updateExternalTesterSchema
} from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdateSchema';
import ExternalTestersUpdateForm from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdateForm';
import { Trans } from '@lingui/macro';
import CardHeader from '@src/components/cards/CardHeader';

export default function ExternalTestersCreate() {
  const { hasCreated } = useAppSelector((state) => state.applicants.applicantCreate);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCreated) {
      if (getValues().email) {
        navigate(PATH_EXTERNAL_TESTERS.root);
      } else {
        dispatch(resetCreatingApplicant());
      }
    }
  }, [hasCreated]);

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(updateExternalTesterSchema),
    defaultValues: updateExternalTesterFormDefaultValues
  });
  const { handleSubmit, getValues } = methods;

  const onSubmit = async (data: UpdateExternalTesterForm) => {
    const createApplicantRequest: CreateApplicantRequest = {
      applicant: {
        firstname: data.firstname,
        lastname: data.lastname,
        type: ApplicantType.TESTER,
        email: data.email,
        phone: data.phone || null,
        externalId: data.externalId || null,
        // @todo - Handle groups
        groups: ['1']
      }
    };

    dispatch(createApplicant(createApplicantRequest));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <LMSCard
          isPageCard
          header={<CardHeader headerText={<Trans>Ajouter un testeur</Trans>} />}
          footer={<ExternalTestersCreateFooter />}
        >
          <ExternalTestersUpdateForm />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
