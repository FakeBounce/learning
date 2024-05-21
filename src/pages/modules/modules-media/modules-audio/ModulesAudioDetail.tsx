import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { PATH_MODULES } from '@utils/navigation/paths';
import {
  modulesMediaAudioFormSchema,
  ModulesAudioDetailForm
} from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { UpdateModuleMediaRequest } from '@services/modules/interfaces';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { updateMediaAction } from '@redux/actions/modulesActions';
import ModulesMediaDetailFooter from '@src/pages/modules/modules-media/ModulesMediaDetailFooter';
import { findMediaId } from '@utils/helpers/modulesFunctions';
import { Box } from '@mui/material';
import RHFTextField from '@src/components/hook-form/RHFTextField';

export default function ModulesAudioDetail() {
  const [audioDetails, setAudioDetails] = useState<ModulesAudioDetailForm>({
    url: '',
    name: ''
  } as ModulesAudioDetailForm);
  const [isEditing, setIsEditing] = useState(false);

  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const { moduleId, audioId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (modulesCurrentData) {
      try {
        if (Number(audioId) && !isNaN(Number(audioId))) {
          const moduleAudio = findMediaId(modulesCurrentData.composition, Number(audioId));
          if (moduleAudio) {
            setAudioDetails({
              url: moduleAudio.path || '',
              name: moduleAudio.name
            });
            return;
          }
        }
        throw new Error();
      } catch (_) {
        navigate(generatePath(PATH_MODULES.profile, { moduleId }));
        enqueueSnackbar(t`L'audio n'existe pas`, { variant: 'error' });
      }
    }
  }, [modulesCurrentData, audioId]);

  const methods = useForm({
    resolver: yupResolver(modulesMediaAudioFormSchema),
    defaultValues: audioDetails,
    values: audioDetails
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { dirtyFields }
  } = methods;

  const audioUrl = watch('url');

  const onSubmit = async (data: ModulesAudioDetailForm) => {
    const updatedAudioDetails = {} as Partial<UpdateModuleMediaRequest>;

    Object.keys(dirtyFields).forEach((field) => {
      const typedField = field as keyof ModulesAudioDetailForm;

      updatedAudioDetails[typedField] = data[typedField];
    });

    if (Object.keys(updatedAudioDetails).length === 0) {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
      return;
    }

    try {
      await dispatch(
        updateMediaAction({
          mediaId: Number(audioId),
          ...updatedAudioDetails
        })
      );
      setIsEditing(false);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <LMSCard
            isPageCard
            header={
              <CardHeader
                headerColor={theme.palette.secondary.main}
                headerText={<Trans>Audio</Trans>}
              />
            }
            footer={
              <ModulesMediaDetailFooter
                isEditing={isEditing}
                onCancelEdit={handleCancelEdit}
                onTriggerEdit={() => setIsEditing(true)}
              />
            }
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {audioUrl !== '' && (
                <audio controls src={audioUrl} style={{ width: '100%' }}>
                  Your browser does not support the audio element.
                </audio>
              )}
              <Box display="flex" gap={2} alignItems="center">
                <RHFTextField name="url" required label={<Trans>URL de l'audio</Trans>} />
              </Box>
              <RHFTextField label={<Trans>Nom de l'audio</Trans>} name="name" required />
            </Box>
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
