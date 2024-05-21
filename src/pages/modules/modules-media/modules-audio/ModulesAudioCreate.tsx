import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { CreateModuleMediaRequest, MediaType } from '@services/modules/interfaces';
import { createMediaAction } from '@redux/actions/modulesActions';
import { PATH_MODULES } from '@utils/navigation/paths';
import { AnyAction } from 'redux';

import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import ModulesMediaCreateFooter from '@src/pages/modules/modules-media/ModulesMediaCreateFooter';

import { modulesMediaAudioFormSchema } from '@src/pages/modules/modules-media/ModulesMediaSchema';
import CardHeader from '@src/components/cards/CardHeader';

export default function ModulesAudioCreate() {
  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(modulesMediaAudioFormSchema),
    defaultValues: {
      url: '',
      name: ''
    }
  });
  const { handleSubmit, watch } = methods;
  const audioUrl = watch('url');

  const onSubmit = async (data: { url: string; name: string }) => {
    try {
      const createMediaData: CreateModuleMediaRequest = {
        moduleId: Number(moduleId),
        mediaType: MediaType.AUDIO,
        ...data
      };

      if (modulesContentForm.subjectId) {
        createMediaData['subjectId'] = modulesContentForm.subjectId;
      }

      const returnedAction: AnyAction = await dispatch(createMediaAction(createMediaData));
      navigate(
        generatePath(PATH_MODULES.audioDetail, {
          moduleId,
          audioId: returnedAction.payload.data.id
        })
      );
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
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
                headerText={<Trans>Ajouter un audio</Trans>}
              />
            }
            footer={<ModulesMediaCreateFooter />}
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
