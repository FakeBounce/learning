import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { createApplicant } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ApplicantNotifications,
  ApplicantType,
  CreateApplicantRequest
} from '@services/applicants/interfaces';
import {
  UpdateApplicantForm,
  updateApplicantFormDefaultValues,
  updateApplicantSchema
} from '@src/pages/applicants/applicants-update/ApplicantsUpdateSchema';
import ApplicantsCreateHeader from '@src/pages/applicants/applicants-create/ApplicantsCreateHeader';
import ApplicantsUpdateForm from '@src/pages/applicants/applicants-update/ApplicantsUpdateForm';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { resetCreatingApplicant } from '@redux/reducers/applicantsReducer';
import { verifyFileForUpload } from '@utils/helpers/validators';
import ApplicantsCreateFooter from '@src/pages/applicants/applicants-create/ApplicantsCreateFooter';

export default function ApplicantsCreate() {
  const [image, setImage] = useState<string | File>('');
  const { hasCreated } = useAppSelector((state) => state.applicants.applicantCreate);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCreated) {
      if (getValues().email) {
        navigate(PATH_APPLICANTS.root);
      } else {
        dispatch(resetCreatingApplicant());
      }
    }
  }, [hasCreated]);

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(updateApplicantSchema),
    defaultValues: updateApplicantFormDefaultValues
  });
  const { handleSubmit, getValues, setError } = methods;

  const onSubmit = async (data: UpdateApplicantForm) => {
    const isFileValid = await verifyFileForUpload(image, setError);

    if (!isFileValid) return;

    // @todo - Wait for API to accept booleans
    const notificationsValues: ApplicantNotifications = {
      email: data.notifications.email ? '1' : '0',
      sms: data.notifications.sms ? '1' : '0',
      app: data.notifications.app ? '1' : '0'
    };

    const createApplicantRequest: CreateApplicantRequest = {
      applicant: {
        firstname: data.firstname,
        lastname: data.lastname,
        type: ApplicantType.STUDENT,
        email: data.email,
        birthDate: data.birthDate,
        phone: data.phone || null,
        externalId: data.externalId || null,
        birthName: data.birthName || null,
        city: data.city || null,
        // @todo - Handle groups
        groups: ['1'],
        notifications: notificationsValues
      },
      profilePicture: image
    };

    // @todo - Handle groups
    dispatch(createApplicant(createApplicantRequest));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <LMSCard isPageCard header={<ApplicantsCreateHeader />} footer={<ApplicantsCreateFooter />}>
          <ApplicantsUpdateForm image={image} setImage={setImage} />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
