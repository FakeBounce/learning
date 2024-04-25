import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { Trans } from '@lingui/macro';
import CardFooter from '@src/components/cards/CardFooter';
import { PATH_MODULES } from '@utils/navigation/paths';
import { useTheme } from '@mui/material/styles';
import {
  modulesCreateDefaultValues,
  modulesCreateSchema
} from '@src/pages/modules/modules-create/ModulesCreateSchema';
import ModulesForm from '@src/pages/modules/ModulesForm';
import { useAppDispatch } from '@redux/hooks';
import { createModuleAction } from '@redux/actions/modulesActions';
import { enqueueSnackbar } from 'notistack';
import { resetModuleState } from '@redux/reducers/modulesReducer';

export default function ModulesCreate() {
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: modulesCreateSchema,
    defaultValues: { ...modulesCreateDefaultValues }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log('DATA', data);
      let newTimer = '00:00:00';

      if (data.timer instanceof Date && !isNaN(data.timer)) {
        newTimer = `${data.timer.getHours().toString().padStart(2, '0')}:${data.timer
          .getMinutes()
          .toString()
          .padStart(2, '0')}:00`;
      }
      await dispatch(
        createModuleAction({
          ...data,
          timer: newTimer,
          // @todo Replace with boolean when api is updated
          isLocked: data.isLocked ? '1' : '0',
          isPublic: data.isPublic ? '1' : '0'
        })
      );
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
