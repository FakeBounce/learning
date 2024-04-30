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
  Applicant,
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
    if (applicantProfileData?.id !== Number(applicantId)) {
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
    }
  }, []);

  useEffect(() => {
    if (applicantProfileData) {
      setApplicant(populateUpdateApplicantForm(applicantProfileData));
      setImage(applicantProfileData.profilePicture || '');
    }
  }, [applicantProfileData]);

  const methods = useForm({
    resolver: yupResolver(updateApplicantSchema),
    defaultValues: applicant,
    values: applicant
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: UpdateApplicantForm) => {
    if (dirtyFields.externalId || dirtyFields.email) {
      setIsModalOpen(true);
      return;
    }

    await handleUpdate(data);
  };

  const handleUpdate = async (data: UpdateApplicantForm) => {
    setIsModalOpen(false);
    const newApplicantValues = {} as Partial<Applicant>;
    Object.keys(dirtyFields).forEach((key) => {
      const typedKey = key as keyof UpdateApplicantForm;
      if (typedKey === 'profilePicture' || typedKey === 'notifications' || typedKey === 'groups')
        return;
      newApplicantValues[typedKey] = data[typedKey];
    });

    if (dirtyFields.notifications) {
      // @todo - Should only update the notifications that have changed
      newApplicantValues.notifications = {
        ...applicantProfileData?.notifications
      } as ApplicantNotifications;
      Object.keys(dirtyFields.notifications).forEach((key) => {
        const typedKey = key as keyof ApplicantNotifications;
        newApplicantValues.notifications![typedKey] = data.notifications[typedKey] ? '1' : '0';
      });
    }

    // @todo - Handle groups update
    if (Object.keys(newApplicantValues).length > 0) {
      const updateApplicantFormToSubmit = {
        applicantId: Number(applicantId),
        applicant: {
          ...newApplicantValues
        }
      } as UpdateApplicantRequest;

      if (image !== applicantProfileData?.profilePicture) {
        updateApplicantFormToSubmit.profilePicture = image;
      }

      // Handle update with image
      dispatch(updateApplicant(updateApplicantFormToSubmit));
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
            header={<ApplicantsProfileHeader isUpdate={isEditing} />}
            footer={isEditing ? <ApplicantsUpdateFooter /> : null}
          >
            {isEditing ? (
              <ApplicantsUpdateForm image={image} setImage={setImage} />
            ) : (
              <>
                <ApplicantsProfileInfos />
                {/* @todo -> Replace with the applicant group */}
                {/*<UserProfileGroups />*/}
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
