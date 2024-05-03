import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { Box, MenuItem, Typography } from '@mui/material';
import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import RHFSelect from '@src/components/hook-form/RHFSelect';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';
import { regexMaxHundred } from '@utils/helpers/regex';
import RHFTimer from '@src/components/hook-form/RHFTimer';
import { answersOptions } from '@src/pages/modules/modules-form/ModulesFormSchema';
import { ChangeEvent } from 'react';

export default function ModulesFormConfig({ disabled = false }: { disabled?: boolean }) {
  const { setValue } = useFormContext();

  const convertEventToNumber = (inputName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (regexMaxHundred.test(e.target.value) || e.target.value === '') {
      setValue(inputName, e.target.value === '' ? 0 : parseInt(e.target.value, 10));
    }
  };

  return (
    <StyledFormColumn sx={{ flex: 2 }}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row', 'row']}
        gap={[2, 2, 5, 5]}
        justifyContent="space-between"
      >
        <StyledFormRow>
          <Box display="flex" sx={{ textWrap: 'nowrap' }}>
            <Typography variant="caption">
              <LabelWithRequired name="timer" label={<Trans>Durée du module</Trans>} />
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <RHFTimer
              ampm={false}
              name="timer"
              size={'small'}
              sx={{ maxWidth: 120, textAlign: 'right' }}
              disabled={disabled}
            />
          </Box>
        </StyledFormRow>

        <StyledFormRow>
          <Box display="flex" sx={{ textWrap: 'nowrap' }}>
            <Typography variant="caption">
              <LabelWithRequired name="nbAttempts" label={<Trans>Recommencer</Trans>} />
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <RHFTextField
              name="nbAttempts"
              onChange={convertEventToNumber('nbAttempts')}
              required
              sx={{ maxWidth: 60 }}
              disabled={disabled}
            />
            fois
          </Box>
        </StyledFormRow>
        <StyledFormRow>
          <Box display="flex" sx={{ textWrap: 'nowrap' }}>
            <Typography variant="caption">
              <LabelWithRequired name="successRate" label={<Trans>Validation du module</Trans>} />
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            Score
            <RHFTextField
              name="successRate"
              type="text"
              onChange={convertEventToNumber('successRate')}
              required
              sx={{ maxWidth: 60 }}
              disabled={disabled}
            />
            %
          </Box>
        </StyledFormRow>
      </Box>
      <StyledFormColumn>
        <StyledFormRow>
          <RHFSelect
            name="displayAnswers"
            label={<Trans>Affichage des réponses</Trans>}
            required
            size="small"
            disabled={disabled}
          >
            {answersOptions.map((answer) => (
              <MenuItem key={answer.value} value={answer.value}>
                {answer.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </StyledFormRow>
      </StyledFormColumn>
      <StyledFormColumn>
        <StyledFormRow sx={{ flexDirection: 'row', gap: 2 }}>
          <RHFSwitch name="isLocked" label={<Trans>Verrouiller</Trans>} disabled={disabled} />
          <RHFSwitch name="isPublic" label={<Trans>Rendre public</Trans>} disabled={disabled} />
        </StyledFormRow>
      </StyledFormColumn>
    </StyledFormColumn>
  );
}
