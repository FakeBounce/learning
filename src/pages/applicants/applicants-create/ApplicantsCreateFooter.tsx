import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { useNavigate } from 'react-router-dom';
import { PATH_APPLICANTS } from '@utils/navigation/paths';

export default function ApplicantsCreateFooter() {
  const navigate = useNavigate();
  const { applicantCreateLoading } = useAppSelector((state) => state.applicants.applicantCreate);

  const cancelCreate = () => {
    navigate(PATH_APPLICANTS.root);
  };

  return (
    <Box display="flex" p={2} px={4}>
      <ActionButton actionType="cancel" loading={applicantCreateLoading} onClick={cancelCreate}>
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" sx={{ ml: 2 }} loading={applicantCreateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
