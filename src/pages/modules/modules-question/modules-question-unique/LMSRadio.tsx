import { Radio, FormControlLabel, Box, TextField, Button, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { t } from '@lingui/macro';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface LMSRadioProps {
  value: number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  error?:
    | Merge<FieldError, FieldErrorsImpl<{ id: string; content: string; rightAnswer: boolean }>>
    | undefined;
  onUpdate?: (_labelValue: string) => void;
  onAdd?: (_labelValue: string) => void;
  onRemove?: () => void;
}

export default function LMSRadio({
  value,
  label,
  disabled = false,
  selected = false,
  error,
  onAdd,
  onRemove,
  onUpdate
}: LMSRadioProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          gap: 2
        }}
      >
        <FormControlLabel
          value={value}
          control={<Radio color="secondary" checked={selected} />}
          disabled={disabled || !onUpdate}
          label={
            <LabelForLMSRadio
              label={label}
              disabled={disabled}
              selected={selected}
              error={!!error}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          }
          sx={{
            width: '100%',
            '& .MuiFormControlLabel-label': {
              width: '100%'
            },
            '&:not(:last-of-type)': {
              mb: 0,
              mr: 2
            },
            mr: 0,
            ...(disabled && {
              '& .MuiRadio-colorSecondary.Mui-disabled': {
                color: (theme) => theme.palette.grey[400]
              }
            })
          }}
        />
      </Box>

      <FormHelperText error={!!error} sx={{ mx: 4 }}>
        {error ? error?.content?.message : undefined}
      </FormHelperText>
    </Box>
  );
}

const LabelForLMSRadio = ({
  selected,
  disabled,
  label,
  error,
  onAdd,
  onRemove,
  onUpdate
}: {
  label: string;
  disabled: boolean;
  selected: boolean;
  error: boolean;
  onAdd?: (_labelValue: string) => void;
  onUpdate?: (_labelValue: string) => void;
  onRemove?: () => void;
}) => {
  const [labelValue, setLabelValue] = useState(label);

  return (
    <Box display="flex" gap={2}>
      <TextField
        value={labelValue}
        onChange={(e) => setLabelValue(e.target.value)}
        onBlur={() => {
          onUpdate && onUpdate(labelValue);
        }}
        disabled={disabled}
        placeholder={t`Ajouter une réponse`}
        error={error}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          sx: selected
            ? {
                color: (theme) => theme.palette.secondary.main
              }
            : {}
        }}
      />

      <Box>
        {onAdd && !disabled && (
          <Button
            variant="contained"
            onClick={() => {
              onAdd(labelValue);
              setLabelValue('');
            }}
            disabled={disabled}
          >
            Add
          </Button>
        )}

        {onRemove && !disabled && (
          <Button variant="outlined" onClick={onRemove} disabled={disabled}>
            Remove
          </Button>
        )}
      </Box>
    </Box>
  );
};
