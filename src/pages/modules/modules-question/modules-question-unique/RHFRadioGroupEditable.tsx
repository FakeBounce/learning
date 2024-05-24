import {
  useFormContext,
  Controller,
  useFieldArray,
  FieldErrors,
  FieldErrorsImpl,
  FieldError,
  Merge
} from 'react-hook-form';
import { FormLabel, RadioGroup, FormControl, FormHelperText, RadioGroupProps } from '@mui/material';
import { ReactNode, useState } from 'react';
import LMSRadio from '@src/pages/modules/modules-question/modules-question-unique/LMSRadio';
import { t } from '@lingui/macro';
import {
  FieldChoiceItem,
  ModulesQuestionFormChoices
} from '@src/pages/modules/modules-question/ModulesQuestionSchema';

type Props = RadioGroupProps & {
  name?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  disabled?: boolean;
};

export default function RHFRadioGroupEditable({
  row,
  name = 'answers',
  label,
  helperText,
  disabled = false,
  ...other
}: Props) {
  const { control, setError } = useFormContext<ModulesQuestionFormChoices>();
  const { fields, append, remove, update, replace } = useFieldArray({
    control,
    name: 'answers',
    rules: {
      minLength: 2
    }
  });

  const labelledby = label ? `${name}-${label}` : '';
  const [blankFieldError, setBlankFieldError] = useState<
    undefined | { content: { message: string } }
  >(undefined);

  return (
    <Controller
      name={'answers'}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const fieldErrors = error as unknown as FieldErrors<FieldChoiceItem[]>; // Cast error to FieldErrors<FieldChoiceItem[]>

        return (
          <FormControl component="fieldset">
            {label && (
              <FormLabel
                id={labelledby}
                sx={{
                  typography: 'body2',
                  color: (theme) => theme.palette.common.black,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  '&.Mui-focused': {
                    color: (theme) => theme.palette.common.black
                  },
                  ...(error && {
                    color: (theme) => theme.palette.error.main
                  })
                }}
              >
                {label}
              </FormLabel>
            )}

            <RadioGroup
              {...field}
              onChange={(e, radioIndex) => {
                const newFieldsArray = fields.map((item, i) => {
                  if (e.target.checked) {
                    if (i === Number(radioIndex)) {
                      return {
                        ...item,
                        rightAnswer: true
                      };
                    }
                    return { ...item, rightAnswer: false };
                  } else {
                    return { ...item, rightAnswer: false };
                  }
                });
                replace(newFieldsArray);
              }}
              aria-labelledby={labelledby}
              row={row}
              sx={{ gap: 2, mt: 1 }}
              {...other}
            >
              {fields.map((item, index) => {
                return (
                  <LMSRadio
                    key={item.id}
                    label={item.content}
                    value={index}
                    selected={item.rightAnswer}
                    onUpdate={(labelValue: string) => {
                      if (!labelValue || labelValue === '') {
                        setError('answers', {
                          type: 'value',
                          message: t`Ce champ ne doit pas être vide`
                        });
                        return;
                      }
                      update(index, { ...item, content: labelValue });
                    }}
                    disabled={disabled}
                    error={fieldErrors ? fieldErrors[index] : undefined}
                    onRemove={() => {
                      remove(index);
                    }}
                  />
                );
              })}
              <LMSRadio
                label={''}
                value={fields.length}
                selected={false}
                disabled={disabled}
                error={
                  blankFieldError as
                    | Merge<
                        FieldError,
                        FieldErrorsImpl<{ id: string; content: string; rightAnswer: boolean }>
                      >
                    | undefined
                }
                onAdd={(labelValue: string) => {
                  if (!labelValue || labelValue === '') {
                    setBlankFieldError({
                      content: {
                        message: t`Ce champ ne doit pas être vide`
                      }
                    });
                    return;
                  }
                  setBlankFieldError(undefined);
                  append({ content: labelValue, rightAnswer: false, id: '' });
                }}
              />
            </RadioGroup>

            {(!!error || helperText) && (
              <FormHelperText error={!!error} sx={{ mx: 0 }}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
