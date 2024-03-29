import LMSModal from '@src/components/lms/LMSModal';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Group } from '@services/groups/interfaces';

interface GroupsListModalProps {
  groupSelected: Group;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  cancelModal: () => void;
}

export default function GroupsListModal({ groupSelected, isModalOpen, setIsModalOpen, cancelModal }: GroupsListModalProps) {

  const deleteGroup = () => {
    if (groupSelected !== null) {
      //@TODO : call the delete action
      enqueueSnackbar(t`Groupe supprimé !`, { variant: 'success' })
      // Reset the popper
      cancelModal();
    }
  };
  return (
    <LMSModal
      title={<Trans>Supprimer un groupe</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={deleteGroup}
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
          </Box>{' '}
          ainsi que tous les{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
            }}
          >
            utilisateurs
          </Box>{' '}
          lui étant rattachés ?
        </Trans>
      </Typography>
    </LMSModal>
  );
}