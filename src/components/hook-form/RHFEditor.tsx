import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import Editor from '@src/components/editor/Editor';
import { EditorProps } from '@src/components/editor/types';

interface RHFEditorProps extends EditorProps {
  name: string;
}

export default function RHFEditor({ name, helperText, ...other }: RHFEditorProps) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful }
  } = useFormContext();

  const values = watch();

  useEffect(() => {
    if (values[name] === '<p><br></p>') {
      setValue(name, '', {
        shouldValidate: !isSubmitSuccessful
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={field.onChange}
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
      )}
    />
  );
}
