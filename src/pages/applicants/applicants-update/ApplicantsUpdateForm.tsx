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
  StyledApplicantColumn,
  StyledApplicantRow,
  StyledApplicantTypography
} from '@src/pages/applicants/ApplicantsStyles';

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
    <Box display="flex" flexDirection="column" gap={2} px={2}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        gap={2}
        alignItems={['flex-start', 'flex-start', 'flex-end']}
        justifyContent={['flex-end', 'flex-end', 'flex-start']}
      >
        <StyledApplicantColumn sx={{ gap: 0 }}>
          <RHFAvatar name={'profilePicture'} image={image} setImage={setImage} />
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <Box display="flex" gap={2} alignItems={['flex-start', 'flex-start', 'flex-end']}>
            <StyledApplicantRow>
              <RHFSwitch
                name={'notifications[app]'}
                label={
                  <StyledApplicantTypography>
                    <Trans>Notifications app</Trans>
                  </StyledApplicantTypography>
                }
              />
            </StyledApplicantRow>
            <StyledApplicantRow>
              <RHFSwitch
                name={'notifications[sms]'}
                label={
                  <StyledApplicantTypography>
                    <Trans>Notifications SMS</Trans>
                  </StyledApplicantTypography>
                }
              />
            </StyledApplicantRow>
            <StyledApplicantRow>
              <RHFSwitch
                name={'notifications[email]'}
                label={
                  <StyledApplicantTypography>
                    <Trans>Notifications email</Trans>
                  </StyledApplicantTypography>
                }
              />
            </StyledApplicantRow>
          </Box>
          <StyledApplicantRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
          </StyledApplicantRow>
        </StyledApplicantColumn>
      </Box>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField
              name={'lastname'}
              label={<LabelWithRequired label={<Trans>Nom</Trans>} />}
            />
          </StyledApplicantRow>
          <StyledApplicantRow>
            <RHFTextField
              name={'firstname'}
              label={<LabelWithRequired label={<Trans>Prénom</Trans>} />}
            />
          </StyledApplicantRow>

          <StyledApplicantRow>
            <RHFTextField
              name={'email'}
              label={<LabelWithRequired label={<Trans>Email</Trans>} />}
            />
          </StyledApplicantRow>

          <StyledApplicantRow>
            <RHFTextField
              name={'birthDate'}
              label={<LabelWithRequired label={<Trans>Date de naissance</Trans>} />}
            />
          </StyledApplicantRow>
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField name={'birthName'} label={<Trans>Nom de naissance</Trans>} />
          </StyledApplicantRow>
          <StyledApplicantRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
          </StyledApplicantRow>
          <StyledApplicantRow>
            <RHFTextField name={'city'} label={<Trans>Ville</Trans>} />
          </StyledApplicantRow>
          {/* @todo Add when groups are down and we can select some */}
          {/*<StyledApplicantRow>*/}
          {/*  <RHFTextField*/}
          {/*    name={'groups'}*/}
          {/*    label={<LabelWithRequired label={<Trans>Groupe(s) lié(s)</Trans>} />}*/}
          {/*  />*/}
          {/*</StyledApplicantRow>*/}
        </StyledApplicantColumn>
      </Box>
    </Box>
  );
}
