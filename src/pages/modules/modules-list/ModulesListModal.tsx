import LMSModal from '@src/components/lms/LMSModal';
import { t, Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Module } from '@services/modules/interfaces';

interface ModulesListModalProps {
  moduleSelected: Module | null;
  isModalOpen: boolean;
  cancelModal: () => void;
}

export default function ModulesListModal({
  moduleSelected,
  isModalOpen,
  cancelModal
}: ModulesListModalProps) {
  const deleteModule = () => {
    if (moduleSelected !== null) {
      //@TODO : call the delete action
      enqueueSnackbar(t`Module supprimé !`, { variant: 'success' });
      // Reset the popper
      cancelModal();
    }
  };

  return (
    <LMSModal
      title={<Trans>Supprimer un module</Trans>}
      open={isModalOpen}
      onClose={cancelModal}
      validateAction={deleteModule}
      cancelAction={cancelModal}
    >
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir supprimer le module{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {moduleSelected?.title}
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
