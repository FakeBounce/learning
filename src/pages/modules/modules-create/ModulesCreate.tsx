import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { Trans } from '@lingui/macro';
import CardFooter from '@src/components/cards/CardFooter';
import { PATH_MODULES } from '@utils/navigation/paths';
import { useTheme } from '@mui/material/styles';
import {
  ModuleFormValues,
  modulesFormDefaultValues,
  modulesFormSchema
} from '@src/pages/modules/modules-form/ModulesFormSchema';
import ModulesForm from '@src/pages/modules/modules-form/ModulesForm';
import { useAppDispatch } from '@redux/hooks';
import { createModuleAction } from '@redux/actions/modulesActions';
import { enqueueSnackbar } from 'notistack';
import { resetModuleState } from '@redux/reducers/modulesReducer';
import { AnyAction } from 'redux';

export default function ModulesCreate() {
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: modulesFormSchema,
    defaultValues: { ...modulesFormDefaultValues }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ModuleFormValues) => {
    try {
      let newTimer = '00:00:00';

      if (data.timer instanceof Date) {
        newTimer = `${data.timer.getHours().toString().padStart(2, '0')}:${data.timer
          .getMinutes()
          .toString()
          .padStart(2, '0')}:00`;
      }

      const returnedAction: AnyAction = await dispatch(
        createModuleAction({
          ...data,
          timer: newTimer,
          // @todo Replace with boolean when api is updated
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          isLocked: data.isLocked ? '1' : '0',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          isPublic: data.isPublic ? '1' : '0',
          tags: data.tags ? data.tags.map((tag) => tag.value) : []
        })
      );
      navigate(generatePath(PATH_MODULES.profile, { moduleId: returnedAction.payload.data.id }));
    } catch (error) {
      enqueueSnackbar('Une erreur est survenue lors de la création du module', {
        variant: 'error'
      });
      dispatch(resetModuleState());
    }
  };

  const cancelAction = () => {
    navigate(PATH_MODULES.root);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <LMSCard
          isPageCard
          header={
            <CardHeader
              headerText={<Trans>Création d’un module</Trans>}
              headerColor={theme.palette.secondary.main}
            />
          }
          footer={<CardFooter isLoading={false} cancelAction={cancelAction} />}
        >
          <ModulesForm />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
