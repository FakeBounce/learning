import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Dispatch, SetStateAction } from 'react';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import RHFAvatar from '@src/components/hook-form/RHFAvatar';
import {
  StyledFormColumn,
  StyledFormRow,
  StyledFormTypography
} from '@src/components/layouts/form/FormStyles';

export default function ApplicantsUpdateForm({
  image,
  setImage
}: {
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
}) {
  const { applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        gap={2}
        alignItems={['flex-start', 'flex-start', 'flex-end']}
        justifyContent={['flex-end', 'flex-end', 'flex-start']}
      >
        <StyledFormColumn sx={{ gap: 0 }}>
          <RHFAvatar name={'profilePicture'} image={image} setImage={setImage} />
        </StyledFormColumn>

        <StyledFormColumn>
          <Box display="flex" gap={2} alignItems={['flex-start', 'flex-start', 'flex-end']}>
            <StyledFormRow>
              <RHFSwitch
                name={'notifications[app]'}
                label={
                  <StyledFormTypography>
                    <Trans>Notifications app</Trans>
                  </StyledFormTypography>
                }
              />
            </StyledFormRow>
            <StyledFormRow>
              <RHFSwitch
                name={'notifications[sms]'}
                label={
                  <StyledFormTypography>
                    <Trans>Notifications SMS</Trans>
                  </StyledFormTypography>
                }
              />
            </StyledFormRow>
            <StyledFormRow>
              <RHFSwitch
                name={'notifications[email]'}
                label={
                  <StyledFormTypography>
                    <Trans>Notifications email</Trans>
                  </StyledFormTypography>
                }
              />
            </StyledFormRow>
          </Box>
          <StyledFormRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField
              name={'lastname'}
              label={<LabelWithRequired label={<Trans>Nom</Trans>} />}
            />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField
              name={'firstname'}
              label={<LabelWithRequired label={<Trans>Prénom</Trans>} />}
            />
          </StyledFormRow>

          <StyledFormRow>
            <RHFTextField
              name={'email'}
              label={<LabelWithRequired label={<Trans>Email</Trans>} />}
            />
          </StyledFormRow>

          <StyledFormRow>
            <RHFTextField
              name={'birthDate'}
              label={<LabelWithRequired label={<Trans>Date de naissance</Trans>} />}
            />
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'birthName'} label={<Trans>Nom de naissance</Trans>} />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'city'} label={<Trans>Ville</Trans>} />
          </StyledFormRow>
          {/* @todo Add when groups are down and we can select some */}
          {/*<StyledFormRow>*/}
          {/*  <RHFTextField*/}
          {/*    name={'groups'}*/}
          {/*    label={<LabelWithRequired label={<Trans>Groupe(s) lié(s)</Trans>} />}*/}
          {/*  />*/}
          {/*</StyledFormRow>*/}
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
