import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import UserProfileGroups from '@src/pages/users/user-profile/user-groups/UserProfileGroups';
import { useAppDispatch } from '@redux/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleApplicant } from '@redux/actions/applicantsActions';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import ApplicantProfileHeader from '@src/pages/applicants/applicants-profile/ApplicantProfileHeader';
import ApplicantProfileInfos from '@src/pages/applicants/applicants-profile/ApplicantProfileInfos';

export default function ApplicantProfile() {
  const dispatch = useAppDispatch();
  const { applicantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const applicantIdToFetch = Number(applicantId);
      if (!isNaN(applicantIdToFetch)) {
        dispatch(getSingleApplicant(applicantIdToFetch));
      } else {
        throw new Error();
      }
    } catch (error) {
      navigate(PATH_ERRORS.root);
      enqueueSnackbar(t`L'étudiant n'existe pas`, { variant: 'error' });
    }
  }, []);

  return (
    <Box px={[0, 2]} display="flex" width="100%">
      <LMSCard isPageCard cardCss={{ position: 'relative' }}>
        <ApplicantProfileHeader />
        <ApplicantProfileInfos />
        <UserProfileGroups groups={[]} />
      </LMSCard>
    </Box>
  );
}
