import { yupResolver } from '@hookform/resolvers/yup';
import { LMSCard } from '@src/components/lms';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { Trans } from '@lingui/macro';
import CardFooter from '@src/components/cards/CardFooter';
import { PATH_MODULES } from '@utils/navigation/paths';
import { useTheme } from '@mui/material/styles';
import IllustrationUploadBox from '@src/components/lms/IllustrationUploadBox';
import { Box, MenuItem, Typography } from '@mui/material';
import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';
import RHFTextField from '@src/components/hook-form/RHFTextField';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import RHFSelect from '@src/components/hook-form/RHFSelect';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';
import RHFDropdown from '@src/components/hook-form/RHFDropdown';
import { BasicOption } from '@services/interfaces';
import MUIRichTextEditor from 'mui-rte';

export const colourOptions: readonly BasicOption[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' }
];

const answersOptions = [
  {
    value: 'end',
    label: <Trans>À la fin du module</Trans>
  },
  {
    value: 'after',
    label: <Trans>Après chaque question</Trans>
  }
];
const languagesOptions = [
  {
    value: 'fr',
    label: 'Français'
  },
  {
    value: 'en',
    label: 'English'
  }
];

export default function ModulesCreate() {
  const [image, setImage] = useState<string | File>('');
  const navigate = useNavigate();
  const theme = useTheme();

  // const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver({}),
    defaultValues: {}
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {};

  const cancelAction = () => {
    navigate(PATH_MODULES.root);
  };

  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };
  const promiseOptions = (inputValue: string) =>
    new Promise<BasicOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 100);
    });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <LMSCard
          isPageCard
          header={
            <CardHeader
              headerText={<Trans>Création d’un module</Trans>}
              headerColor={theme.palette.secondary.main}
            />
          }
          footer={<CardFooter isLoading={false} cancelAction={cancelAction} />}
        >
          <Box display="flex" flex="1" gap={2} flexDirection={['column', 'row']}>
            <Box display="flex" flex="1">
              <IllustrationUploadBox />
            </Box>
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
                      <LabelWithRequired label={<Trans>Durée du module</Trans>} />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <RHFTextField
                      name="length"
                      type="text"
                      value="00:00:00:00"
                      required
                      sx={{ maxWidth: 120, textAlign: 'right' }}
                    />
                  </Box>
                </StyledFormRow>
                <StyledFormRow>
                  <Box display="flex" sx={{ textWrap: 'nowrap' }}>
                    <Typography variant="caption">
                      <LabelWithRequired label={<Trans>Recommencer</Trans>} />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <RHFTextField
                      name="tentatives"
                      type="text"
                      value="0"
                      required
                      sx={{ maxWidth: 60 }}
                    />
                    fois
                  </Box>
                </StyledFormRow>
                <StyledFormRow>
                  <Box display="flex" sx={{ textWrap: 'nowrap' }}>
                    <Typography variant="caption">
                      <LabelWithRequired label={<Trans>Validation du module</Trans>} />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    Score
                    <RHFTextField
                      name="length"
                      type="text"
                      value="100"
                      required
                      sx={{ maxWidth: 60 }}
                    />
                    %
                  </Box>
                </StyledFormRow>
              </Box>
              <StyledFormColumn>
                <StyledFormRow>
                  <RHFSelect
                    name="answers"
                    label={<Trans>Affichage des réponses</Trans>}
                    defaultValue={answersOptions[0].value}
                    required
                    size="small"
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
                  <RHFSwitch name="lock" label={<Trans>Verrouiller</Trans>} />
                  <RHFSwitch name="public" label={<Trans>Rendre public</Trans>} />
                </StyledFormRow>
              </StyledFormColumn>
            </StyledFormColumn>
          </Box>
          <Box display="flex" gap={2}>
            <Box display="flex" flex="2">
              <RHFTextField
                type="text"
                name="moduleName"
                required
                label={<Trans>Nom du module</Trans>}
              />
            </Box>
            <Box display="flex" flex="1">
              <RHFSelect
                name="language"
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
          <StyledFormRow>
            <MUIRichTextEditor label="Start typing..." />
          </StyledFormRow>
        </LMSCard>
      </form>
    </FormProvider>
  );
}
