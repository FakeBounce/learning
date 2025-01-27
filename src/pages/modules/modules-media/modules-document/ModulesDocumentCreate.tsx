import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { FormProvider, useForm } from 'react-hook-form';
import { LMSCard } from '@src/components/lms';
import ModulesStudyPlan from '@src/pages/modules/modules-study-plan/ModulesStudyPlan';
import Box from '@mui/material/Box';
import CardHeader from '@src/components/cards/CardHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import ModulesMediaCreateFooter from '@src/pages/modules/modules-media/ModulesMediaCreateFooter';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { CreateModuleMediaRequest, MediaType } from '@services/modules/interfaces';
import { useCallback } from 'react';
import { createMediaAction } from '@redux/actions/modulesActions';
import { PATH_MODULES } from '@utils/navigation/paths';
import { AnyAction } from 'redux';
import { modulesMediaDocumentFormSchema } from '@src/pages/modules/modules-media/ModulesMediaSchema';
import { RHFUploadDocBox } from '@src/components/hook-form/RHFUploadDocBox';
import IframeDisplayer from '@src/components/iframe/IframeDisplayer';

export default function ModulesDocumentCreate() {
  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { moduleId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(modulesMediaDocumentFormSchema),
    defaultValues: {
      file: '',
      name: ''
    }
  });
  const { handleSubmit, watch, setValue, resetField } = methods;
  const fileInfos: undefined | (File & { preview?: string }) | string = watch('file');

  const onSubmit = async (data: { file: File | string; name: string }) => {
    try {
      const createMediaData: CreateModuleMediaRequest = {
        moduleId: Number(moduleId)
      } as CreateModuleMediaRequest;
      if (modulesContentForm.subjectId) {
        createMediaData['subjectId'] = modulesContentForm.subjectId;
      }
      const newFile = data.file as File;
      const returnedAction: AnyAction = await dispatch(
        createMediaAction({
          ...createMediaData,
          name: data.name,
          file: newFile,
          mediaType: MediaType.DOCUMENT
        })
      );
      navigate(
        generatePath(PATH_MODULES.documentDetail, {
          moduleId,
          documentId: returnedAction.payload.data.id
        })
      );
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file) // Create and assign a preview URL to the file object
      });

      setValue('file', newFile, { shouldDirty: true }); // Update the RHF form state
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
                headerText={<Trans>Ajouter un document</Trans>}
              />
            }
            footer={<ModulesMediaCreateFooter />}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {fileInfos instanceof File && fileInfos.preview && (
                <IframeDisplayer iframeUrl={fileInfos.preview} />
              )}
              <RHFUploadDocBox
                name="file"
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                accept={{
                  'application/pdf': []
                }}
              />

              <RHFTextField label={<Trans>Nom du document</Trans>} name="name" required />
            </Box>
          </LMSCard>
        </form>
      </FormProvider>
      <ModulesStudyPlan />
    </>
  );
}
