import { Trans } from '@lingui/macro';
import { useFormContext } from 'react-hook-form';
import { RHFUploadBox } from '@src/components/hook-form/RHFUploadBox';
import { ChangeEvent, useCallback } from 'react';
import Box from '@mui/material/Box';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';
import { regexMaxHundred } from '@utils/helpers/regex';
import { QuestionType } from '@services/modules/interfaces';
import { LMSCard } from '@src/components/lms';
import CardHeader from '@src/components/cards/CardHeader';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';

export default function ModulesQuestionFormConfig() {
  const { modulesContentForm } = useAppSelector((state) => state.modules);
  const { setValue, resetField } = useFormContext();
  const theme = useTheme();

  const handleTitleDisplay = () => {
    switch (modulesContentForm.questionType) {
      case QuestionType.TRUE_FALSE:
        return <Trans>Question : Vrai/Faux</Trans>;
      case QuestionType.CLASSIFY_IN_ORDER:
        return <Trans>Question : Classifier dans l'ordre</Trans>;
      case QuestionType.CHECKBOX:
        return <Trans>Question : Choix unique</Trans>;
      case QuestionType.CLICKABLE_IMAGE:
        return <Trans>Question : Image cliquable</Trans>;
      case QuestionType.FREE_TEXT:
        return <Trans>Question : Question libre</Trans>;
      case QuestionType.MULTIPLE_CHOICE:
        return <Trans>Question : Choix multiple</Trans>;
      case QuestionType.TEXT_WITH_HOLE:
      default:
        return <Trans>Question : Texte à trou</Trans>;
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      resetField('media');
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });

      if (file) {
        setValue('media', newFile, { shouldDirty: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    resetField('media');
  };

  const convertEventToNumber = (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (regexMaxHundred.test(e.target.value) || e.target.value === '') {
      setValue(inputName, e.target.value === '' ? 0 : parseInt(e.target.value, 10));
    }
  };

  return (
    <LMSCard
      isPageCard
      header={
        <CardHeader headerColor={theme.palette.secondary.main} headerText={handleTitleDisplay()} />
      }
    >
      <Box display="flex" flex="1" gap={2} flexDirection={['column', 'row']}>
        <Box display="flex" flex="1">
          <RHFUploadBox
            name="media"
            onDrop={handleDrop}
            onRemove={handleRemoveFile}
            sx={{ minHeight: 200 }}
            accept={{
              'image/jpeg': [],
              'image/jpg': [],
              'image/png': [],
              'image/svg+xml': []
            }}
          />
        </Box>
        <Box display="flex" flex="1" gap={2} flexDirection="column">
          <RHFTextField
            name="nbPoints"
            onChange={convertEventToNumber('nbPoints')}
            label={<Trans>Nombre de points</Trans>}
            required
          />
          <RHFSwitch name="isEliminatory" label={<Trans>Question éliminatoire</Trans>} required />
        </Box>
      </Box>

      <Box display="flex" flex="1" gap={2}>
        <RHFTextField
          name="title"
          multiline
          label={<Trans>Énoncé de la question</Trans>}
          maxRows={2}
          required
        />
      </Box>
    </LMSCard>
  );
}
