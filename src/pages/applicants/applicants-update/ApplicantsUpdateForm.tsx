import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Dispatch, SetStateAction } from 'react';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { ApplicantNotifications, ApplicantProfileState } from '@services/applicants/interfaces';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';

import RHFAvatar from '@src/components/hook-form/RHFAvatar';
import {
  StyledFormColumn,
  StyledFormRow,
  StyledFormTypography
} from '@src/components/layouts/form/FormStyles';
import ApplicantsUpdateDifferences from '@src/pages/applicants/applicants-update/ApplicantsUpdateDifferences';
import { formatDate } from 'date-fns';
import RHFDatePicker from '@src/components/hook-form/RHFDatePicker';
import RHFDropdownGroups from '@src/components/hook-form/RHFDropdownGroups';
import { selectIsOnMainOrganization } from '@redux/reducers/connectedUserReducer';

export default function ApplicantsUpdateForm({
  image,
  setImage
}: {
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
}) {
  const { applicantProfileLoading, applicantProfileData }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );
  const isOnMainOrganization = useAppSelector(selectIsOnMainOrganization);

  if (applicantProfileLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} px={4}>
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
          <ApplicantsUpdateDifferences
            //empty because we use the same warning box for all notifications
            fieldName={''}
            value={applicantProfileData?.conflicts?.notifications as ApplicantNotifications}
          />

          <StyledFormRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'externalId'}
              value={applicantProfileData?.conflicts?.externalId}
            />
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
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

          <StyledFormRow>
            <RHFDatePicker name={'birthDate'} label={<Trans>Date de naissance</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'birthDate'}
              value={
                applicantProfileData?.conflicts?.birthDate
                  ? formatDate(applicantProfileData?.conflicts?.birthDate, 'dd/MM/yyyy')
                  : undefined
              }
            />
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'birthName'} label={<Trans>Nom de naissance</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'birthName'}
              value={applicantProfileData?.conflicts?.birthName}
            />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
            {applicantProfileData?.conflicts?.phone && (
              <ApplicantsUpdateDifferences
                fieldName={'phone'}
                value={applicantProfileData?.conflicts?.phone}
              />
            )}
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'city'} label={<Trans>Ville</Trans>} />
            <ApplicantsUpdateDifferences
              fieldName={'city'}
              value={applicantProfileData?.conflicts?.city}
            />
          </StyledFormRow>
          {!isOnMainOrganization && (
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
          )}
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
