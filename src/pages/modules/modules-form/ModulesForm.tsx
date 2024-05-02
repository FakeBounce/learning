import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { StyledFormRow } from '@src/components/layouts/form/FormStyles';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import RHFSelect from '@src/components/hook-form/RHFSelect';
import RHFDropdown from '@src/components/hook-form/RHFDropdown';
import { BasicOption } from '@services/interfaces';
import { RHFUploadBox } from '@src/components/hook-form/RHFUploadBox';
import {
  colourOptions,
  languagesOptions
} from '@src/pages/modules/modules-create/ModulesCreateSchema';
import ModulesFormConfig from '@src/pages/modules/modules-form/ModulesFormConfig';

export default function ModulesForm() {
  const { setValue, resetField } = useFormContext();
  /**
   * Color options will be the array of tags received by the API
   * We don't have the API yet, so we are using a static array
   * We might even not need to filter
   **/
  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  /**
   * This function will be used to fetch the tags from the API
   * @param inputValue
   */
  const promiseOptions = (inputValue: string) =>
    new Promise<BasicOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 100);
    });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
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

  return (
    <>
      <Box display="flex" flex="1" gap={2} flexDirection={['column', 'row']}>
        <Box display="flex" flex="1">
          <RHFUploadBox name={'media'} onDrop={handleDrop} onRemove={handleRemoveFile} />
        </Box>
        <ModulesFormConfig />
      </Box>
      <Box display="flex" gap={2}>
        <Box display="flex" flex="2">
          <RHFTextField type="text" name="title" required label={<Trans>Nom du module</Trans>} />
        </Box>
        <Box display="flex" flex="1">
          <RHFSelect
            name="languageId"
            label={<Trans>Langue</Trans>}
            defaultValue={languagesOptions[0].value}
            required
            size="small"
          >
            {languagesOptions.map((language) => (
              <MenuItem key={language.value} value={language.value}>
                {language.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Box>
      <StyledFormRow>
        <RHFTextField
          type="textarea"
          multiline
          name="description"
          required
          label={<Trans>Description</Trans>}
        />
      </StyledFormRow>
      <StyledFormRow>
        <RHFDropdown
          isMulti
          isClearable
          placeholder={<Trans>Assignez une valeur et appuyez sur la touche entrée</Trans>}
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions={[]}
          name="tags"
          label={<Trans>Tags</Trans>}
        />
      </StyledFormRow>
    </>
  );
}
