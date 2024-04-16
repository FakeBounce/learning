import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Group } from '@services/groups/interfaces';
import { useAppSelector } from '@redux/hooks';

interface GroupsListModalProps {
  groupSelected: Group;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleDeleteGroup: () => void;
  cancelModal: () => void;
}

export default function GroupsListModal({
  groupSelected,
  isModalOpen,
  setIsModalOpen,
  handleDeleteGroup,
  cancelModal
}: GroupsListModalProps) {
  const { groupsDeleteLoading } = useAppSelector((state) => state.groups);

  return (
    <LMSModal
      title={<Trans>Supprimer un groupe</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={handleDeleteGroup}
      cancelAction={cancelModal}
      isLoading={groupsDeleteLoading}
    >
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir supprimer le groupe{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {groupSelected.name}
          </Box>
          , cela aura pour effet de retirer tous les{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium
            }}
          >
            utilisateurs et les droits
          </Box>{' '}
          lui étant rattachés ?
        </Trans>
      </Typography>
    </LMSModal>
  );
}
