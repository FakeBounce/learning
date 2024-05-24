import { LMSCard } from '@src/components/lms';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import { getSingleModuleAction, updateModuleAction } from '@redux/actions/modulesActions';
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
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import { UpdateModuleRequest } from '@services/modules/interfaces';
import { cancelEditingModule, resetModuleLoading } from '@redux/reducers/modulesReducer';

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
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: ModuleFormValues) => {
    const newModuleData = {} as UpdateModuleRequest;

    let newTimer = '00:00:00';
    Object.keys(dirtyFields).forEach((key) => {
      const formKey = key as keyof ModuleFormValues;
      const value = data[formKey];

      if (value !== undefined) {
        switch (formKey) {
          case 'timer':
            newTimer = `${data.timer.getHours().toString().padStart(2, '0')}:${data.timer
              .getMinutes()
              .toString()
              .padStart(2, '0')}:00`;
            newModuleData['timer'] = newTimer;
            break;
          // @TODO Set to boolean when API is updated
          case 'isLocked':
          case 'isPublic':
            newModuleData[formKey] = data[formKey] ? '1' : '0';
            break;
          case 'tags':
            newModuleData[formKey] = data.tags ? data.tags.map((tag) => tag.value) : [];
            break;
          case 'media':
            break;
          default:
            if (value !== null) {
              newModuleData[formKey] = value as any;
            }
            break;
        }
      }
    });

    try {
      await dispatch(updateModuleAction({ ...newModuleData, moduleId: Number(moduleId) }));
      dispatch(cancelEditingModule());
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: 'error'
      });
      dispatch(resetModuleLoading());
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <LMSCard isPageCard header={<ModulesProfileHeader />} footer={<ModulesProfileFooter />}>
            <ModulesForm disabled={!modulesCurrentIsEditing} />
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
