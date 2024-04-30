import IllustrationUploadBox, {
  IllustrationUploadBoxProps
} from '@src/components/lms/IllustrationUploadBox';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

interface Props extends Omit<IllustrationUploadBoxProps, 'file'> {
  name: string;
  multiple?: boolean;
}

export function RHFUploadBox({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <IllustrationUploadBox
            multiple
            accept={{ 'image/*': [] }}
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
          <IllustrationUploadBox
            accept={{ 'image/*': [] }}
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
