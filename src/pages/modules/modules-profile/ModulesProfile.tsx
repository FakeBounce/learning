import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import { getSingleModuleAction } from '@redux/actions/modulesActions';
import ModulesForm from '@src/pages/modules/modules-form/ModulesForm';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ModuleFormValues,
  modulesFormDefaultValues,
  modulesFormSchema,
  populateModuleForm
} from '@src/pages/modules/modules-form/ModulesFormSchema';
import ModulesProfileHeader from '@src/pages/modules/modules-profile/ModulesProfileHeader';
import ModulesProfileFooter from '@src/pages/modules/modules-profile/ModulesProfileFooter';

export default function ModulesProfile() {
  const [module, setModule] = useState(modulesFormDefaultValues);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { modulesCurrentData, modulesCurrentIsEditing } = useAppSelector(
    (state) => state.modules.modulesCurrent
  );
  const { moduleId } = useParams();

  useEffect(() => {
    if (modulesCurrentData) {
      setModule(populateModuleForm(modulesCurrentData));
    }
  }, [modulesCurrentData]);

  // Update the form if we are on the update page
  useEffect(() => {
    if (modulesCurrentData?.id !== Number(moduleId)) {
      try {
        const moduleIdToFetch = Number(moduleId);
        if (!isNaN(moduleIdToFetch)) {
          dispatch(getSingleModuleAction({ id: moduleIdToFetch }));
        } else {
          throw new Error();
        }
      } catch (_) {
        navigate(PATH_ERRORS.root);
        enqueueSnackbar(t`Le module n'existe pas`, { variant: 'error' });
      }
    }
  }, []);

  const methods = useForm({
    resolver: modulesFormSchema,
    defaultValues: module,
    values: module
  });
  const { handleSubmit } = methods;

  const onSubmit = async (_data: ModuleFormValues) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <LMSCard isPageCard header={<ModulesProfileHeader />} footer={<ModulesProfileFooter />}>
          <ModulesForm disabled={!modulesCurrentIsEditing} />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
