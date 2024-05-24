import { Radio, FormControlLabel, Box, TextField } from '@mui/material';

interface LMSRadioProps {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  error?: boolean;
}

export default function LMSRadioReadonly({
  value,
  label,
  disabled = false,
  selected = false,
  error = false
}: LMSRadioProps) {
  return (
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
        control={<Radio color="secondary" />}
        disabled={disabled}
        label={
          <LabelForLMSRadio label={label} disabled={disabled} selected={selected} error={error} />
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
  );
}

const LabelForLMSRadio = ({
  selected,
  disabled,
  label,
  error
}: {
  label: string;
  disabled: boolean;
  selected: boolean;
  error: boolean;
}) => {
  return (
    <TextField
      value={label}
      disabled={disabled}
      error={error}
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        readOnly: true,
        sx: selected
          ? {
              color: (theme) => theme.palette.secondary.main
            }
          : {}
      }}
    />
  );
};
