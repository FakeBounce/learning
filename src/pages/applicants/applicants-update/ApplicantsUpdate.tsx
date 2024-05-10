import { yupResolver } from '@hookform/resolvers/yup';
import { t } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getSingleApplicant, updateApplicant } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import ApplicantsUpdateFooter from './ApplicantsUpdateFooter';
import ApplicantsUpdateForm from './ApplicantsUpdateForm';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import {
  ApplicantNotifications,
  ApplicantProfileState,
  ApplicantUpdateState,
  UpdateApplicantRequest
} from '@services/applicants/interfaces';
import ApplicantsProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantsProfileHeader';
import {
  populateUpdateApplicantForm,
  UpdateApplicantForm,
  updateApplicantFormDefaultValues,
  updateApplicantSchema
} from '@src/pages/applicants/applicants-update/ApplicantsUpdateSchema';
import ApplicantsProfileInfos from '@src/pages/applicants/applicants-profile/ApplicantsProfileInfos';
import ApplicantsUpdateModal from '@src/pages/applicants/applicants-update/ApplicantsUpdateModal';
import ApplicantsProfileGroups from '@src/pages/applicants/applicants-profile/ApplicantsProfileGroups';
import { resetApplicantsLoading } from '@redux/reducers/applicantsReducer';

export default function ApplicantsUpdate() {
  const [applicant, setApplicant] = useState<UpdateApplicantForm>(updateApplicantFormDefaultValues);
  const [image, setImage] = useState<string | File>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { applicantId } = useParams();
  const navigate = useNavigate();

  const { applicantProfileData }: Partial<ApplicantProfileState> = useAppSelector(
    (state) => state.applicants.applicantProfile
  );
  const { isEditing }: Partial<ApplicantUpdateState> = useAppSelector(
    (state) => state.applicants.applicantUpdate
  );

  // Update the form if we are on the update page
  useEffect(() => {
    try {
      const applicantIdToFetch = Number(applicantId);
      if (!isNaN(applicantIdToFetch)) {
        dispatch(getSingleApplicant(applicantIdToFetch));
      } else {
        throw new Error();
      }
    } catch (_) {
      navigate(PATH_ERRORS.root);
      enqueueSnackbar(t`L'étudiant n'existe pas`, { variant: 'error' });
    }
  }, []);

  const methods = useForm({
    resolver: yupResolver(updateApplicantSchema),
    defaultValues: applicant,
    values: applicant
  });
  const {
    handleSubmit,
    reset,
    formState: { dirtyFields }
  } = methods;

  useEffect(() => {
    if (applicantProfileData) {
      setApplicant(populateUpdateApplicantForm(applicantProfileData));
      if (applicantProfileData.profilePicture) {
        setImage(applicantProfileData.profilePicture);
      }
      reset();
    }
  }, [applicantProfileData, isEditing]);

  const onSubmit = async (data: UpdateApplicantForm) => {
    if (dirtyFields.externalId || dirtyFields.email) {
      setIsModalOpen(true);
      return;
    }

    await handleUpdate(data);
  };

  const handleUpdate = async (data: UpdateApplicantForm) => {
    setIsModalOpen(false);

    const newApplicantValues = {} as Partial<UpdateApplicantRequest['applicant']>;

    Object.keys(dirtyFields).forEach((key) => {
      const typedKey = key as keyof UpdateApplicantForm;
      if (
        typedKey === 'profilePicture' ||
        typedKey === 'notifications' ||
        typedKey === 'groupsId' ||
        typedKey === 'birthDate'
      ) {
        return;
      }
      newApplicantValues[typedKey] = data[typedKey];
    });

    if (dirtyFields.birthDate) {
      newApplicantValues.birthDate = data.birthDate;
    }

    if (dirtyFields.notifications) {
      newApplicantValues.notifications = {} as ApplicantNotifications;
      Object.keys(dirtyFields.notifications).forEach((key) => {
        const typedKey = key as keyof ApplicantNotifications;
        newApplicantValues.notifications![typedKey] = data.notifications[typedKey];
      });
    }

    if (dirtyFields.groupsId && data.groupsId) {
      newApplicantValues.groupsId = data.groupsId.map((group) => group.value);
    }

    if (Object.keys(newApplicantValues).length > 0 || dirtyFields.profilePicture) {
      const updateApplicantFormToSubmit = {
        applicantId: Number(applicantId),
        applicant: {
          ...newApplicantValues
        }
      } as UpdateApplicantRequest;

      try {
        // Handle update with image
        await dispatch(
          updateApplicant({
            applicantId: Number(applicantId),
            updateArgs: updateApplicantFormToSubmit,
            profilePicture: dirtyFields.profilePicture ? (image as File) : undefined
          })
        );
      } catch (error) {
        enqueueSnackbar(error as string, { variant: 'error' });
        dispatch(resetApplicantsLoading());
      }
    } else {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
    }
  };

  const getDirtyFieldsForModal = () => {
    return Object.keys(dirtyFields).filter((key) => key === 'externalId' || key === 'email');
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <LMSCard
            isPageCard
            contentPadding={0}
            header={<ApplicantsProfileHeader isUpdate={isEditing} />}
            footer={isEditing ? <ApplicantsUpdateFooter /> : null}
          >
            {isEditing ? (
              <ApplicantsUpdateForm image={image} setImage={setImage} />
            ) : (
              <>
                <ApplicantsProfileInfos />
                <ApplicantsProfileGroups />
              </>
            )}
          </LMSCard>
        </form>
      </FormProvider>
      {isModalOpen && isEditing && (
        <ApplicantsUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleSubmit(handleUpdate)}
          fieldsUpdated={getDirtyFieldsForModal()}
        />
      )}
    </>
  );
}
