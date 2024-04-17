import { KeyboardEventHandler, memo, ReactNode, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { t } from '@lingui/macro';
import AsyncCreatableSelect, { AsyncCreatableProps } from 'react-select/async-creatable';
import { useTheme } from '@mui/material/styles';
import { StylesConfig } from 'react-select';
import { BasicOption } from '@services/interfaces';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';

const createOption = (label: string) => ({
  label,
  value: label
});

interface RHFDropdownProps extends AsyncCreatableProps<any, any, any> {
  name: string;
  required?: boolean;
  label: ReactNode;
  placeholder?: ReactNode;
}

const defaultPlaceholder = t`Assignez une valeur et appuyez sur la touche entrée`;

function RHFDropdown({
  name,
  required = false,
  label,
  placeholder = defaultPlaceholder,
  ...other
}: RHFDropdownProps) {
  const [inputValue, setInputValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState<readonly BasicOption[]>([]);
  const { control, setValue } = useFormContext();
  const theme = useTheme();

  const colourStyles: StylesConfig<BasicOption, true> = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: 'white',
        boxShadow: 'none',
        borderColor: isFocused ? theme.palette.primary.main : theme.palette.grey[400],
        borderWidth: isFocused ? 2 : 1,
        ':hover': {
          borderColor: isFocused ? theme.palette.primary.main : theme.palette.grey[800]
        }
      };
    },
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = theme.palette.secondary.main;
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color
          : isFocused
          ? theme.palette.secondary.lighter
          : undefined,
        color: isDisabled ? '#ccc' : isSelected ? theme.palette.secondary.light : color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled ? undefined : isSelected ? theme.palette.error.main : undefined
        }
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: theme.palette.secondary.lighter
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: theme.palette.secondary.main
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: theme.palette.secondary.main,
      ':hover': {
        backgroundColor: theme.palette.error.main,
        color: 'white',
        cursor: 'pointer'
      }
    })
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue(name, [...dropdownValue, createOption(inputValue)]);
        setDropdownValue([...dropdownValue, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  return (
    <Box display="flex" flex="1" flexDirection="column">
      <Typography variant="caption">
        {required ? <LabelWithRequired label={label} /> : label}
      </Typography>
      <Box mt={0.5}>
        <Controller
          name={name}
          control={control}
          defaultValue={control._defaultValues[name]}
          render={({ field: { value }, fieldState: { error } }) => (
            <Box>
              <AsyncCreatableSelect
                onChange={(newValue) => {
                  setValue(name, newValue);
                  setDropdownValue(newValue);
                }}
                value={value}
                onKeyDown={handleKeyDown}
                onInputChange={(newInputValue) => setInputValue(newInputValue)}
                inputValue={inputValue}
                placeholder={placeholder}
                styles={colourStyles}
                formatCreateLabel={(inputValue) => t`Créer le tag "${inputValue}"`}
                {...other}
              />
              {error && (
                <Typography variant="caption" sx={{ color: (theme) => theme.palette.error.main }}>
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}

export default memo(RHFDropdown);
