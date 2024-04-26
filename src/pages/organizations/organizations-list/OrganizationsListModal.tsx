import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { toggleOrganizationsBlock } from '@redux/actions/organizationsActions';
import { Organization } from '@services/organizations/interfaces';

const titleToDisplay = (organizationSelected: Organization) => {
  if (!organizationSelected.isActive) {
    return <Trans>Débloquer une organisation</Trans>;
  }
  return <Trans>Bloquer une organisation</Trans>;
};

const textToDisplay = (organizationSelected: Organization) => {
  if (organizationSelected.isActive) {
    return (
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir débloquer l’organisation{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {organizationSelected.name}
          </Box>{' '}
          et tout ses utilisateurs ?
        </Trans>
      </Typography>
    );
  }
  return (
    <Typography>
      <Trans>
        Êtes-vous sûr de vouloir bloquer l’organisation{' '}
        <Box
          component={'span'}
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightMedium,
            textTransform: 'uppercase'
          }}
        >
          {organizationSelected.name}
        </Box>{' '}
        et tout ses utilisateurs ?
      </Trans>
    </Typography>
  );
};

interface OrganizationsListModalProps {
  organizationSelected: Organization;
  isModalOpen: boolean;
  setIsModalOpen: (_value: boolean) => void;
  cancelModal: () => void;
}

export default function OrganizationsListModal({
  organizationSelected,
  isModalOpen,
  setIsModalOpen,
  cancelModal
}: OrganizationsListModalProps) {
  const dispatch = useAppDispatch();

  const toggleBlock = () => {
    if (organizationSelected !== null) {
      dispatch(
        toggleOrganizationsBlock({
          setActive: !organizationSelected.isActive,
          organizationId: organizationSelected.id
        })
      ).then(() => {
        // Reset the popper
        cancelModal();
      });
    }
  };
  return (
    <LMSModal
      title={titleToDisplay(organizationSelected)}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={toggleBlock}
      cancelAction={cancelModal}
    >
      {textToDisplay(organizationSelected)}
    </LMSModal>
  );
}
