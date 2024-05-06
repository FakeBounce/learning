import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@redux/hooks';
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
import { verifyFileForUpload } from '@utils/helpers/validators';
import ApplicantsCreateFooter from '@src/pages/applicants/applicants-create/ApplicantsCreateFooter';
import { enqueueSnackbar } from 'notistack';
import { resetApplicantState } from '@redux/reducers/applicantsReducer';
import { getGroups } from '@services/groups/groupsAPI';
import { Group } from '@services/groups/interfaces';

export default function ApplicantsCreate() {
  const [image, setImage] = useState<string | File>('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(updateApplicantSchema),
    defaultValues: updateApplicantFormDefaultValues
  });
  const { handleSubmit, setValue, setError } = methods;

  // @todo - Rework this to add filter on isMain
  useEffect(() => {
    getGroups({
      currentPage: 1,
      rowsPerPage: 1000
    })
      .then((response) => {
        const defaultGroup = response.data.data.rows.find(
          (group) => group.isMain === true
        ) as Group;
        setValue('groupsId', [{ label: defaultGroup.name, value: defaultGroup.id.toString() }]);
        return;
      })
      .catch((error) => {
        enqueueSnackbar(error as string, { variant: 'error' });
      });
  }, []);

  const onSubmit = async (data: UpdateApplicantForm) => {
    if (image !== '') {
      const isFileValid = await verifyFileForUpload(image, setError);

      if (!isFileValid) {
        return;
      }
    }

    const notificationsValues: ApplicantNotifications = {
      email: data.notifications.email,
      sms: data.notifications.sms,
      app: data.notifications.app
    };

    const createApplicantRequest: CreateApplicantRequest = {
      applicant: {
        firstname: data.firstname,
        lastname: data.lastname,
        type: ApplicantType.STUDENT,
        email: data.email,
        birthDate: data.birthDate || undefined,
        phone: data.phone || undefined,
        externalId: data.externalId || undefined,
        birthName: data.birthName || undefined,
        city: data.city || undefined,
        groupsId: data.groupsId.map((group) => group.value),
        notifications: notificationsValues
      },
      profilePicture: image
    };

    try {
      await dispatch(createApplicant(createApplicantRequest));
      navigate(PATH_APPLICANTS.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetApplicantState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <LMSCard isPageCard header={<ApplicantsCreateHeader />} footer={<ApplicantsCreateFooter />}>
          <ApplicantsUpdateForm image={image} setImage={setImage} />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
