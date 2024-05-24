import { t, Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LMSModal from '@src/components/lms/LMSModal';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import MenuItem from '@mui/material/MenuItem';
import { moduleContentTypes, moduleQuestionTypes } from '@utils/helpers/moduleContent';
import {
  MediaType,
  ModuleCompositionItem,
  ModuleCompositionItemType
} from '@services/modules/interfaces';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading, setContentForm } from '@redux/reducers/modulesReducer';
import RHFSelect from '@src/components/hook-form/RHFSelect';
import { generatePath, useNavigate } from 'react-router-dom';
import { getPathsForQuestions, PATH_MODULES } from '@utils/navigation/paths';

const ModulesStudyPlanContentModalSchema = Yup.object().shape({
  subject: Yup.string().optional(),
  questionType: Yup.string().when('contentType', {
    is: (contentType: string) => contentType === ModuleCompositionItemType.QUESTION,
    then: (schema) => schema.required(t`Veuillez sélectionner un type de question`),
    otherwise: (schema) => schema
  }),
  contentType: Yup.string().required(t`Veuillez sélectionner un type de contenu`)
});

interface ModulesStudyPlanContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModulesStudyPlanContentModal({
  isOpen,
  onClose
}: ModulesStudyPlanContentModalProps) {
  const {
    modulesLoading,
    modulesCurrent: { modulesCurrentData }
  } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(ModulesStudyPlanContentModalSchema),
    defaultValues: {
      subject: 'none',
      questionType: '',
      contentType: moduleContentTypes[0].value
    }
  });

  const { handleSubmit, reset, watch } = methods;
  const watchModuleType = watch('contentType');

  const onSubmit = async (data: any) => {
    try {
      dispatch(
        setContentForm({
          subjectId: data.subject === 'none' ? undefined : data.subject,
          contentType: data.contentType,
          questionType:
            data.contentType === ModuleCompositionItemType.QUESTION ? data.questionType : undefined
        })
      );

      switch (data.contentType) {
        case ModuleCompositionItemType.QUESTION:
          navigate(
            generatePath(getPathsForQuestions(data.questionType), {
              moduleId: modulesCurrentData?.id
            })
          );
          break;
        case MediaType.IMAGE:
          navigate(generatePath(PATH_MODULES.addImage, { moduleId: modulesCurrentData?.id }));
          break;
        case MediaType.VIDEO:
          navigate(generatePath(PATH_MODULES.addVideo, { moduleId: modulesCurrentData?.id }));
          break;
        case MediaType.DOCUMENT:
          navigate(generatePath(PATH_MODULES.addDocument, { moduleId: modulesCurrentData?.id }));
          break;
        case MediaType.AUDIO:
          navigate(generatePath(PATH_MODULES.addAudio, { moduleId: modulesCurrentData?.id }));
          break;
      }
      handleClose();
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const getSubjectsFromComposition = () => {
    if (!modulesCurrentData) {
      return [];
    }
    return modulesCurrentData?.composition.filter(
      (item: ModuleCompositionItem) => item.type === ModuleCompositionItemType.SUBJECT
    );
  };

  return (
    <LMSModal
      title={<Trans>Ajouter du contenu</Trans>}
      open={isOpen}
      onClose={handleClose}
      validateAction={handleSubmit(onSubmit)}
      cancelAction={handleClose}
      isLoading={modulesLoading}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="body1">
              <Trans>
                Créer des sujets permet d’organiser l’activité en classant les contenus dans des
                dossiers, selon un thème commun.
              </Trans>
            </Typography>

            <RHFSelect label={<Trans>Type de contenu</Trans>} required name="contentType">
              {moduleContentTypes.map((moduleContentType) => {
                return (
                  <MenuItem key={moduleContentType.value} value={moduleContentType.value}>
                    {moduleContentType.label}
                  </MenuItem>
                );
              })}
            </RHFSelect>

            {watchModuleType === ModuleCompositionItemType.QUESTION && (
              <RHFSelect label={<Trans>Type de question</Trans>} required name="questionType">
                {moduleQuestionTypes.map((moduleQuestionType) => {
                  return (
                    <MenuItem key={moduleQuestionType.value} value={moduleQuestionType.value}>
                      {moduleQuestionType.label}
                    </MenuItem>
                  );
                })}
              </RHFSelect>
            )}

            <RHFSelect label={<Trans>Dans le sujet</Trans>} name="subject">
              <MenuItem value={'none'}>
                <Trans>Aucun</Trans>
              </MenuItem>
              {getSubjectsFromComposition().map((moduleSubject: ModuleCompositionItem) => {
                return (
                  <MenuItem key={moduleSubject.id} value={moduleSubject.id}>
                    {moduleSubject.name}
                  </MenuItem>
                );
              })}
            </RHFSelect>
          </Box>
        </form>
      </FormProvider>
    </LMSModal>
  );
}
