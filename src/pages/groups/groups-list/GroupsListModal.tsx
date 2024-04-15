import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Group } from '@services/groups/interfaces';

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
  return (
    <LMSModal
      title={<Trans>Supprimer un groupe</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={handleDeleteGroup}
      cancelAction={cancelModal}
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
