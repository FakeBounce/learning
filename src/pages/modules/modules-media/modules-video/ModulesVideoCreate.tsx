import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import Box from '@mui/material/Box';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import ModulesMediaCreateFooter from '@src/pages/modules/modules-media/ModulesMediaCreateFooter';
import ActionButton from '@src/components/lms/ActionButton';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { CreateModuleMediaRequest, MediaType } from '@services/modules/interfaces';
import { createMediaAction } from '@redux/actions/modulesActions';
import { modulesMediaVideoFormSchema } from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { PATH_MODULES } from '@utils/navigation/paths';
import { AnyAction } from 'redux';
import IframeDisplayer from '@src/components/iframe/IframeDisplayer';

export default function ModulesVideoCreate() {
  const [fetchedVideoUrl, setFetchedVideoUrl] = useState('');

  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(modulesMediaVideoFormSchema),
    defaultValues: {
      url: '',
      name: ''
    }
  });
  const { handleSubmit, watch } = methods;
  const videoUrl = watch('url');

  const fetchVideo = async () => {
    // Simulate fetching video URL or actual video data
    setFetchedVideoUrl(videoUrl);
  };

  const onSubmit = async (data: { url: string; name: string }) => {
    try {
      const createMediaData: CreateModuleMediaRequest = {
        moduleId: Number(moduleId)
      } as CreateModuleMediaRequest;
      if (modulesContentForm.subjectId) {
        createMediaData['subjectId'] = modulesContentForm.subjectId;
      }
      const returnedAction: AnyAction = await dispatch(
        createMediaAction({ ...createMediaData, ...data, mediaType: MediaType.VIDEO })
      );
      navigate(
        generatePath(PATH_MODULES.videoDetail, {
          moduleId,
          videoId: returnedAction.payload.data.id
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
                headerText={<Trans>Ajouter une vidéo</Trans>}
              />
            }
            footer={<ModulesMediaCreateFooter />}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {fetchedVideoUrl && <IframeDisplayer iframeUrl={fetchedVideoUrl} />}

              <Box display="flex" gap={2}>
                <RHFTextField name="url" required />
                <ActionButton actionType="update" onClick={fetchVideo}>
                  <Trans>Ok</Trans>
                </ActionButton>
              </Box>

              <RHFTextField label={<Trans>Nom de la vidéo</Trans>} name="name" required />
            </Box>
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
