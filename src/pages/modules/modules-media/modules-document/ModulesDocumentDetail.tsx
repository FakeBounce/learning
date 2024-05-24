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
  modulesMediaDocumentFormSchema
} from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { MediaType, UpdateModuleMediaRequest } from '@services/modules/interfaces';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { updateMediaAction } from '@redux/actions/modulesActions';
import ModulesMediaDetailFooter from '@src/pages/modules/modules-media/ModulesMediaDetailFooter';
import { findMediaId } from '@utils/helpers/modulesFunctions';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import Box from '@mui/material/Box';
import { RHFUploadDocBox } from '@src/components/hook-form/RHFUploadDocBox';
import IframeDisplayer from '@src/components/iframe/IframeDisplayer';

export default function ModulesDocumentDetail() {
  const [documentDetails, setDocumentDetails] = useState<ModulesImageDetailForm>({
    file: '',
    name: ''
  } as ModulesImageDetailForm);
  const [isEditing, setIsEditing] = useState(false);

  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const { moduleId, documentId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (modulesCurrentData) {
      try {
        if (Number(documentId) && !isNaN(Number(documentId))) {
          const moduleDocument = findMediaId(modulesCurrentData.composition, Number(documentId));
          if (moduleDocument) {
            setDocumentDetails({
              file: moduleDocument.path || '',
              name: moduleDocument.name
            });
            return;
          }
        }
        throw new Error();
      } catch (_) {
        navigate(generatePath(PATH_MODULES.profile, { moduleId }));
        enqueueSnackbar(t`Le document n'existe pas`, { variant: 'error' });
      }
    }
  }, [modulesCurrentData, documentId]);

  const methods = useForm({
    resolver: yupResolver(modulesMediaDocumentFormSchema),
    defaultValues: documentDetails,
    values: documentDetails
  });

  const {
    handleSubmit,
    setValue,
    resetField,
    watch,
    reset,
    formState: { dirtyFields }
  } = methods;
  const fileInfos: undefined | (File & { preview?: string }) | string = watch('file');

  const onSubmit = async (data: ModulesImageDetailForm) => {
    const updatedDocumentDetails = {} as Partial<UpdateModuleMediaRequest>;

    Object.keys(dirtyFields).forEach((field) => {
      const typedField = field as keyof ModulesImageDetailForm;

      if (typedField === 'file') {
        updatedDocumentDetails['file'] = data['file'] as File;
        updatedDocumentDetails['mediaType'] = MediaType.DOCUMENT;
      } else {
        updatedDocumentDetails[typedField] = data[typedField];
      }
    });

    if (Object.keys(updatedDocumentDetails).length === 0) {
      enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
      return;
    }

    try {
      await dispatch(
        updateMediaAction({
          mediaId: Number(documentId),
          ...updatedDocumentDetails
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
                headerText={<Trans>Document</Trans>}
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
              <IframeDisplayer
                iframeUrl={
                  fileInfos instanceof File && fileInfos.preview
                    ? fileInfos.preview
                    : (documentDetails.file as string)
                }
              />

              <RHFUploadDocBox
                name="file"
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                accept={{
                  'application/pdf': []
                }}
                sx={isEditing ? {} : { display: 'none' }}
              />

              <RHFTextField
                label={<Trans>Nom du document</Trans>}
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