import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import ActionButton from '@src/components/lms/ActionButton';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';

export default function GroupsCreateFooter() {
  const navigate = useNavigate();
  const { groupsCreateLoading } = useAppSelector((state) => state.groups.groupsCreate);

  const cancelCreate = () => {
    navigate(PATH_GROUPS.root);
  };

  return (
    <Box display="flex" p={2} px={4}>
      <ActionButton actionType="cancel" loading={groupsCreateLoading} onClick={cancelCreate}>
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" sx={{ ml: 2 }} loading={groupsCreateLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}
