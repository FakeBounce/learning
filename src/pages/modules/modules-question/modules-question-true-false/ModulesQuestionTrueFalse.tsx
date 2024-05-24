import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { CreateModuleQuestionRequest, QuestionType } from '@services/modules/interfaces';
import ModulesQuestionFormConfig from '@src/pages/modules/modules-question/ModulesQuestionFormConfig';
import Box from '@mui/material/Box';
import ModulesQuestionAnswersTrueFalse from '@src/pages/modules/modules-question/modules-question-true-false/ModulesQuestionAnswersTrueFalse';
import {
  moduleQuestionDefaultValuesTrueFalse,
  ModulesQuestionFormTrueFalse,
  modulesQuestionFormTrueFalseSchema
} from '@src/pages/modules/modules-question/ModulesQuestionSchema';
import ModulesQuestionExplanation from '@src/pages/modules/modules-question/ModulesQuestionExplanation';
import { createQuestionAction } from '@redux/actions/modulesActions';
import { AnyAction } from 'redux';
import { PATH_MODULES } from '@utils/navigation/paths';

export default function ModulesQuestionTrueFalse() {
  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(modulesQuestionFormTrueFalseSchema),
    defaultValues: moduleQuestionDefaultValuesTrueFalse,
    mode: 'all',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: ModulesQuestionFormTrueFalse) => {
    try {
      let createQuestionData: CreateModuleQuestionRequest = {
        moduleId: Number(moduleId)
      } as CreateModuleQuestionRequest;
      if (modulesContentForm.subjectId) {
        createQuestionData['subjectId'] = modulesContentForm.subjectId;
      }

      createQuestionData = {
        ...createQuestionData,
        answers: [
          // @TODO Wait API change for boolean
          { content: t`Vrai`, rightAnswer: data.answers === 'true' ? 1 : 0 },
          { content: t`Faux`, rightAnswer: data.answers === 'false' ? 1 : 0 }
        ],
        explanation: data.explanation,
        media: data.media,
        title: data.title,
        nbPoints: data.nbPoints,
        // @TODO Wait API change for boolean
        answersRandomOrder: data.answersRandomOrder ? 1 : 0,
        isEliminatory: data.isEliminatory ? 1 : 0,
        questionType: QuestionType.TRUE_FALSE
      };

      console.log('data', data);
      console.log('createQuestionData', createQuestionData);

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
              <ModulesQuestionAnswersTrueFalse />
            </LMSCard>
            <ModulesQuestionExplanation />
          </Box>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
