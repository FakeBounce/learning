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
import ApplicantsProfileGroups from '@src/pages/applicants/applicants-profile/ApplicantsProfileGroups';
import { resetApplicantsLoading } from '@redux/reducers/applicantsReducer';

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
    const newApplicantValues = {} as Partial<UpdateApplicantRequest['applicant']>;
    Object.keys(dirtyFields).forEach((key) => {
      const typedKey = key as keyof UpdateExternalTesterForm;
      if (typedKey === 'groupsId') return;
      newApplicantValues[typedKey] = data[typedKey];
    });

    if (dirtyFields.groupsId && data.groupsId) {
      newApplicantValues.groupsId = data.groupsId.map((group) => group.value);
    }

    if (Object.keys(newApplicantValues).length > 0) {
      const updateApplicantFormToSubmit = {
        applicantId: Number(applicantId),
        applicant: {
          ...newApplicantValues
        }
      } as UpdateApplicantRequest;

      try {
        await dispatch(
          updateApplicant({
            applicantId: Number(applicantId),
            updateArgs: updateApplicantFormToSubmit
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
              <ExternalTestersUpdateForm />
            ) : (
              <>
                <ExternalTestersProfileInfos />
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
