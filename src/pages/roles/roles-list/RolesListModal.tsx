import LMSModal from '@src/components/lms/LMSModal';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

interface RolesListModalProps {
  roleSelected: any;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  cancelModal: () => void;
}

export default function RolesListModal({
  roleSelected,
  isModalOpen,
  setIsModalOpen,
  cancelModal
}: RolesListModalProps) {
  const deleteRole = () => {
    if (roleSelected !== null) {
      //@TODO : call the delete action
      enqueueSnackbar(t`Rôle supprimé !`, { variant: 'success' });
      // Reset the popper
      cancelModal();
    }
  };
  return (
    <LMSModal
      title={<Trans>Supprimer un rôle</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={deleteRole}
      cancelAction={cancelModal}
    >
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir supprimer le rôle{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {roleSelected.name}
          </Box>{' '}
          ainsi que tous les{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium
            }}
          >
            groupes
          </Box>{' '}
          et{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium
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
