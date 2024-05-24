import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import {
  CreateModuleQuestionRequest,
  ModuleQuestionAnswerChoices,
  QuestionType
} from '@services/modules/interfaces';
import ModulesQuestionFormConfig from '@src/pages/modules/modules-question/ModulesQuestionFormConfig';
import Box from '@mui/material/Box';
import {
  moduleQuestionDefaultChoices,
  ModulesQuestionFormChoices,
  modulesQuestionFormChoicesSchema
} from '@src/pages/modules/modules-question/ModulesQuestionSchema';
import ModulesQuestionExplanation from '@src/pages/modules/modules-question/ModulesQuestionExplanation';
import { createQuestionAction } from '@redux/actions/modulesActions';
import { AnyAction } from 'redux';
import { PATH_MODULES } from '@utils/navigation/paths';
import ModulesQuestionAnswersUnique from '@src/pages/modules/modules-question/modules-question-unique/ModulesQuestionAnswersUnique';

export default function ModulesQuestionUnique() {
  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(modulesQuestionFormChoicesSchema),
    defaultValues: moduleQuestionDefaultChoices,
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: ModulesQuestionFormChoices) => {
    try {
      let createQuestionData: CreateModuleQuestionRequest = {
        moduleId: Number(moduleId)
      } as CreateModuleQuestionRequest;
      if (modulesContentForm.subjectId) {
        createQuestionData['subjectId'] = modulesContentForm.subjectId;
      }

      const newAnswers = data.answers.map((answer) => {
        return {
          content: answer.content,
          rightAnswer: answer.rightAnswer ? 1 : 0
        } as ModuleQuestionAnswerChoices;
      });

      createQuestionData = {
        ...createQuestionData,
        answers: newAnswers,
        explanation: data.explanation,
        media: data.media,
        title: data.title,
        nbPoints: data.nbPoints,
        // @TODO Wait API change for boolean
        answersRandomOrder: data.answersRandomOrder ? 1 : 0,
        isEliminatory: data.isEliminatory ? 1 : 0,
        questionType: QuestionType.CHECKBOX
      };

      const returnedAction: AnyAction = await dispatch(createQuestionAction(createQuestionData));
      navigate(
        generatePath(PATH_MODULES.questionDetail, {
          moduleId,
          questionId: returnedAction.payload.data.id
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
          <Box display="flex" flex={1} gap={2} flexDirection={'column'}>
            <ModulesQuestionFormConfig />
            <LMSCard
              isPageCard
              header={
                <CardHeader
                  headerColor={theme.palette.secondary.main}
                  headerText={<Trans>Réponses</Trans>}
                />
              }
            >
              <ModulesQuestionAnswersUnique />
            </LMSCard>
            <ModulesQuestionExplanation />
          </Box>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
