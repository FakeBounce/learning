import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LMSModal from '@src/components/lms/LMSModal';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { createSubjectAction } from '@redux/actions/modulesActions';

interface ModulesStudyPlanSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModulesStudyPlanSubjectModalSchema = Yup.object().shape({
  title: Yup.string().required('Ce champ est requis')
});

export default function ModulesStudyPlanSubjectModal({
  isOpen,
  onClose
}: ModulesStudyPlanSubjectModalProps) {
  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const modulesLoading = useAppSelector((state) => state.modules.modulesLoading);
  const dispatch = useAppDispatch();

  const methods = useForm({
    resolver: yupResolver(ModulesStudyPlanSubjectModalSchema),
    defaultValues: {
      title: ''
    }
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      await dispatch(createSubjectAction({ moduleId: modulesCurrentData.id, ...data }));
      onClose();
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <LMSModal
      title={<Trans>Ajouter un sujet</Trans>}
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

            <RHFTextField name={'title'} label={<Trans>Titre du sujet</Trans>} required />
          </Box>
        </form>
      </FormProvider>
    </LMSModal>
  );
}
