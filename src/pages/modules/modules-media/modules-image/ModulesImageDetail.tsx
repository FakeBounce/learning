import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { PATH_MODULES } from '@utils/navigation/paths';
import {
  ModulesImageDetailForm,
  modulesMediaImageFormSchema
} from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { MediaType, UpdateModuleMediaRequest } from '@services/modules/interfaces';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { updateMediaAction } from '@redux/actions/modulesActions';
import ModulesMediaDetailFooter from '@src/pages/modules/modules-media/ModulesMediaDetailFooter';
import { findMediaId } from '@utils/helpers/modulesFunctions';
import { RHFUploadBox } from '@src/components/hook-form/RHFUploadBox';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import Box from '@mui/material/Box';

export default function ModulesImageDetail() {
  const [imageDetails, setImageDetails] = useState<ModulesImageDetailForm>({
    file: '',
    name: ''
  } as ModulesImageDetailForm);
  const [isEditing, setIsEditing] = useState(false);

  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const { moduleId, imageId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (modulesCurrentData) {
      try {
        if (Number(imageId) && !isNaN(Number(imageId))) {
          const moduleImage = findMediaId(modulesCurrentData.composition, Number(imageId));
          if (moduleImage) {
            setImageDetails({
              file: moduleImage.path || '',
              name: moduleImage.name
            });
            return;
          }
        }
        throw new Error();
      } catch (_) {
        navigate(generatePath(PATH_MODULES.profile, { moduleId }));
        enqueueSnackbar(t`L'image n'existe pas`, { variant: 'error' });
      }
    }
  }, [modulesCurrentData, imageId]);

  const methods = useForm({
    resolver: yupResolver(modulesMediaImageFormSchema),
    defaultValues: imageDetails,
    values: imageDetails
  });

  const {
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { dirtyFields }
  } = methods;

  const onSubmit = async (data: ModulesImageDetailForm) => {
    const updatedImageDetails = {} as Partial<UpdateModuleMediaRequest>;

    Object.keys(dirtyFields).forEach((field) => {
      const typedField = field as keyof ModulesImageDetailForm;

      if (typedField === 'file') {
        updatedImageDetails['file'] = data['file'] as File;
        updatedImageDetails['mediaType'] =
          (data['file'] as File).type === 'image/gif' ? MediaType.GIF : MediaType.IMAGE;
      } else {
        updatedImageDetails[typedField] = data[typedField];
      }
    });

    if (Object.keys(updatedImageDetails).length === 0) {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
      return;
    }

    try {
      await dispatch(
        updateMediaAction({
          mediaId: Number(imageId),
          ...updatedImageDetails
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
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      resetField('file');
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });

      if (file) {
        setValue('file', newFile, { shouldDirty: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    resetField('file');
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
                headerText={<Trans>Image</Trans>}
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
            <Box display="flex" flexDirection="column" gap={2}>
              <RHFUploadBox
                name="file"
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                sx={{ minHeight: 200 }}
                disabled={!isEditing}
                accept={{
                  'image/jpeg': [],
                  'image/gif': [],
                  'image/png': [],
                  'image/svg+xml': []
                }}
              />

              <RHFTextField
                label={<Trans>Nom de l'image</Trans>}
                name="name"
                required
                disabled={!isEditing}
              />
            </Box>
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
