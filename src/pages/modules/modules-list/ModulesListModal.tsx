import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Module } from '@services/modules/interfaces';

interface ModulesListModalProps {
  moduleSelected: Module | null;
  isModalOpen: boolean;
  cancelModal: () => void;
  handleDeleteModule: () => void;
}

export default function ModulesListModal({
  moduleSelected,
  isModalOpen,
  cancelModal,
  handleDeleteModule
}: ModulesListModalProps) {
  const deleteModule = () => {
    if (moduleSelected !== null) {
      handleDeleteModule();
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
