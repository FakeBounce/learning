import { yupResolver } from '@hookform/resolvers/yup';
import { t } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getSingleApplicant, updateApplicant } from '@redux/actions/applicantsActions';
import { LMSCard } from '@src/components/lms';
import ApplicantsUpdateFooter from '@src/pages/applicants/applicants-update/ApplicantsUpdateFooter';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import {
  Applicant,
  ApplicantProfileState,
  ApplicantUpdateState,
  UpdateApplicantRequest
} from '@services/applicants/interfaces';
import ApplicantsProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantsProfileHeader';
import ApplicantsUpdateModal from '@src/pages/applicants/applicants-update/ApplicantsUpdateModal';
import ExternalTestersUpdateForm from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdateForm';
import {
  populateUpdateExternalTesterForm,
  UpdateExternalTesterForm,
  updateExternalTesterFormDefaultValues,
  updateExternalTesterSchema
} from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdateSchema';
import ExternalTestersProfileInfos from '@src/pages/externalTesters/externalTesters-profile/ExternalTestersProfileInfos';

export default function ExternalTestersUpdate() {
  const [applicant, setApplicant] = useState<UpdateExternalTesterForm>(
    updateExternalTesterFormDefaultValues
  );
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
        enqueueSnackbar(t`Le testeur n'existe pas`, { variant: 'error' });
      }
    }
  }, []);

  useEffect(() => {
    if (applicantProfileData) {
      setApplicant(populateUpdateExternalTesterForm(applicantProfileData));
    }
  }, [applicantProfileData]);

  const methods = useForm({
    resolver: yupResolver(updateExternalTesterSchema),
    defaultValues: applicant,
    values: applicant
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: UpdateExternalTesterForm) => {
    if (dirtyFields.externalId || dirtyFields.email) {
      setIsModalOpen(true);
      return;
    }

    await handleUpdate(data);
  };

  const handleUpdate = async (data: UpdateExternalTesterForm) => {
    setIsModalOpen(false);
    const newApplicantValues = {} as Partial<Applicant>;
    Object.keys(dirtyFields).forEach((key) => {
      const typedKey = key as keyof UpdateExternalTesterForm;
      if (typedKey === 'groups') return;
      newApplicantValues[typedKey] = data[typedKey];
    });

    // @todo - Handle groups update
    if (Object.keys(newApplicantValues).length > 0) {
      const updateApplicantFormToSubmit = {
        applicantId: Number(applicantId),
        applicant: {
          ...newApplicantValues
        }
      } as UpdateApplicantRequest;

      // Handle update with image
      dispatch(
        updateApplicant({
          applicantId: Number(applicantId),
          updateArgs: updateApplicantFormToSubmit
        })
      );
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <LMSCard
            isPageCard
            header={<ApplicantsProfileHeader isUpdate={isEditing} />}
            footer={isEditing ? <ApplicantsUpdateFooter /> : null}
          >
            {isEditing ? (
              <ExternalTestersUpdateForm />
            ) : (
              <>
                <ExternalTestersProfileInfos />
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
