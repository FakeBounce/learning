import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { cancelEditingApplicant } from '@redux/reducers/applicantsReducer';

export default function ApplicantsUpdateFooter() {
  const dispatch = useAppDispatch();

  const { applicantUpdateLoading } = useAppSelector((state) => state.applicants.applicantUpdate);

  const cancelUpdate = () => {
    dispatch(cancelEditingApplicant());
  };

  return (
    <Box display="flex" p={2} px={4}>
      <ActionButton actionType="cancel" loading={applicantUpdateLoading} onClick={cancelUpdate}>
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" sx={{ ml: 2 }} loading={applicantUpdateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
