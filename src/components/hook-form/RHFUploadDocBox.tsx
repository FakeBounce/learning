import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import DocumentUploadBox, { DocumentUploadBoxProps } from '@src/components/lms/DocumentUploadBox';

interface Props extends Omit<DocumentUploadBoxProps, 'file'> {
  name: string;
  multiple?: boolean;
}

export function RHFUploadDocBox({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <DocumentUploadBox
            multiple
            accept={{ 'application/pdf': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <DocumentUploadBox
            accept={{ 'application/pdf': [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}
