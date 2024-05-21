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
  modulesMediaVideoFormSchema,
  ModulesVideoDetailForm
} from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { UpdateModuleMediaRequest } from '@services/modules/interfaces';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { updateMediaAction } from '@redux/actions/modulesActions';
import ModulesMediaDetailFooter from '@src/pages/modules/modules-media/ModulesMediaDetailFooter';
import ModulesVideoForm from '@src/pages/modules/modules-media/modules-video/ModulesVideoForm';
import { findMediaId } from '@utils/helpers/modulesFunctions';

export default function ModulesVideoDetail() {
  const [videoDetails, setVideoDetails] = useState<ModulesVideoDetailForm>({
    url: '',
    name: ''
  } as ModulesVideoDetailForm);
  const [fetchedVideoUrl, setFetchedVideoUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const { moduleId, videoId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (modulesCurrentData) {
      try {
        if (Number(videoId) && !isNaN(Number(videoId))) {
          const moduleVideo = findMediaId(modulesCurrentData.composition, Number(videoId));
          if (moduleVideo) {
            setVideoDetails({
              url: moduleVideo.path || '',
              name: moduleVideo.name
            });
            return;
          }
        }
        throw new Error();
      } catch (_) {
        navigate(generatePath(PATH_MODULES.profile, { moduleId }));
        enqueueSnackbar(t`La vidéo n'existe pas`, { variant: 'error' });
      }
    }
  }, [modulesCurrentData, videoId]);

  const methods = useForm({
    resolver: yupResolver(modulesMediaVideoFormSchema),
    defaultValues: videoDetails,
    values: videoDetails
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { dirtyFields }
  } = methods;

  const videoUrl = watch('url');

  const fetchVideo = async () => {
    if (videoUrl === '' || !videoUrl) {
      return;
    }
    setFetchedVideoUrl(videoUrl);
  };

  const onSubmit = async (data: ModulesVideoDetailForm) => {
    const updatedVideoDetails = {} as Partial<UpdateModuleMediaRequest>;

    Object.keys(dirtyFields).forEach((field) => {
      const typedField = field as keyof ModulesVideoDetailForm;

      updatedVideoDetails[typedField] = data[typedField];
    });

    if (Object.keys(updatedVideoDetails).length === 0) {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
      return;
    }

    try {
      await dispatch(
        updateMediaAction({
          mediaId: Number(videoId),
          ...updatedVideoDetails
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
    setFetchedVideoUrl(videoDetails.url || '');
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
                headerText={<Trans>Vidéo</Trans>}
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
            <ModulesVideoForm
              isEditing={isEditing}
              videoUrl={fetchedVideoUrl !== '' ? fetchedVideoUrl : videoDetails.url}
              fetchVideo={fetchVideo}
            />
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
