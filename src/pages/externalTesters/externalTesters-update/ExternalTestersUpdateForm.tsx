import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { ApplicantProfileState } from '@services/applicants/interfaces';

import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';
import RHFDropdownGroups from '@src/components/hook-form/RHFDropdownGroups';
import ApplicantsUpdateDifferences from '@src/pages/applicants/applicants-update/ApplicantsUpdateDifferences';

export default function ExternalTestersUpdateForm() {
  const { applicantProfileData, applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'lastname'} label={<Trans>Nom</Trans>} required />
            <ApplicantsUpdateDifferences
              fieldName={'lastname'}
              value={applicantProfileData?.conflicts?.lastname}
            />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'firstname'} label={<Trans>Prénom</Trans>} required />
            <ApplicantsUpdateDifferences
              fieldName={'firstname'}
              value={applicantProfileData?.conflicts?.firstname}
            />
          </StyledFormRow>

          <StyledFormRow>
            <RHFTextField name={'email'} label={<Trans>Email</Trans>} required />
            <ApplicantsUpdateDifferences
              fieldName={'email'}
              value={applicantProfileData?.conflicts?.email}
            />
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'externalId'}
              value={applicantProfileData?.conflicts?.externalId}
            />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'phone'}
              value={applicantProfileData?.conflicts?.phone}
            />
          </StyledFormRow>
          <StyledFormRow>
            <RHFDropdownGroups
              isMulti
              isClearable
              cacheOptions
              defaultOptions={[]}
              required
              name="groupsId"
              label={<Trans>Groupe(s) lié(s)</Trans>}
            />
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
