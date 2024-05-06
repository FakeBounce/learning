import { memo, ReactNode, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { t } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { StylesConfig } from 'react-select';
import { BasicOption } from '@services/interfaces';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import debounce from 'lodash/debounce';
import { getGroups } from '@services/groups/groupsAPI';

interface RHFDropdownProps extends AsyncProps<any, any, any> {
  name: string;
  required?: boolean;
  label: ReactNode;
  placeholder?: ReactNode;
}

const defaultPlaceholder = t`Saissisez pour rechercher`;

function RHFDropdownGroups({
  name,
  required = false,
  label,
  placeholder = defaultPlaceholder,
  ...other
}: RHFDropdownProps) {
  const [inputValue, setInputValue] = useState('');
  const { control, setValue } = useFormContext();

  /**
   * This function will be used to fetch the groups from the API
   * @param inputValue
   */
  // Use useCallback to memoize the debounced function
  const loadOptions = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getGroups({
        currentPage: 1,
        rowsPerPage: 10,
        filters: {
          operator: 'AND',
          items: [{ field: 'name', operator: 'contains', value: inputValue }]
        }
      }).then((response) => {
        const options = response.data.data.rows.map((group: any) => ({
          label: group.name,
          value: group.id
        }));
        callback(options);
      });
    }, 300),
    []
  ); // Empty dependency array to ensure it doesn't recreate

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
        },
        '&.error': {
          borderColor: theme.palette.error.main
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
          backgroundColor: !isDisabled
            ? undefined
            : isSelected
            ? theme.palette.error.main
            : undefined
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

  return (
    <Box display="flex" flex="1" flexDirection="column" position="relative">
      <Box>
        <Controller
          name={name}
          control={control}
          defaultValue={control._defaultValues[name]}
          render={({ field: { value }, fieldState: { error } }) => (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: 10,
                  backgroundColor: 'white',
                  padding: '0 5px',
                  zIndex: 1,
                  color: (theme) => theme.palette.grey[600]
                }}
              >
                {required ? (
                  <LabelWithRequired
                    name={name}
                    label={
                      error ? (
                        <Box component={'span'} sx={{ color: (theme) => theme.palette.error.main }}>
                          {label}
                        </Box>
                      ) : (
                        label
                      )
                    }
                  />
                ) : (
                  <label htmlFor={name}>
                    {error ? (
                      <Box component={'span'} sx={{ color: (theme) => theme.palette.error.main }}>
                        {label}
                      </Box>
                    ) : (
                      label
                    )}
                  </label>
                )}
              </Typography>
              <AsyncSelect
                onChange={(newValue) => {
                  setValue(name, newValue, { shouldDirty: true });
                }}
                data-testid="rhf-dropdown-groups"
                id={name}
                value={value}
                required={required}
                loadOptions={(inputValue, callback) => loadOptions(inputValue, callback)}
                onInputChange={(newInputValue) => setInputValue(newInputValue)}
                inputValue={inputValue}
                placeholder={placeholder}
                styles={colourStyles}
                classNames={{
                  control: () => (error ? 'error' : '')
                }}
                {...other}
              />
              {error && (
                <Typography
                  variant="caption"
                  sx={{ color: (theme) => theme.palette.error.main, ml: 2 }}
                >
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

export default memo(RHFDropdownGroups);
