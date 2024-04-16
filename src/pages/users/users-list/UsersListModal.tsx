import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { User } from '@services/users/interfaces';
import { toggleUserBlock } from '@redux/actions/usersActions';

const titleToDisplay = (userSelected: User) => {
  if (!userSelected.isActive) {
    return <Trans>Débloquer un utilisateur</Trans>;
  }
  return <Trans>Bloquer un utilisateur</Trans>;
};

const textToDisplay = (userSelected: User) => {
  if (userSelected.isActive) {
    return (
      <Typography>
        <Trans>
          Êtes-vous sûr de vouloir débloquer l’utilisateur{' '}
          <Box
            component={'span'}
            sx={{
              fontWeight: (theme) => theme.typography.fontWeightMedium,
              textTransform: 'uppercase'
            }}
          >
            {userSelected.lastname} {userSelected.firstname}
          </Box>{' '}
          ?
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
          {userSelected.lastname} {userSelected.firstname}
        </Box>{' '}
        ?
      </Trans>
    </Typography>
  );
};

interface UsersListModalProps {
  userSelected: User;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  cancelModal: () => void;
}

export default function UsersListModal({
  userSelected,
  isModalOpen,
  setIsModalOpen,
  cancelModal
}: UsersListModalProps) {
  const dispatch = useAppDispatch();

  const toggleBlock = () => {
    if (userSelected !== null) {
      dispatch(
        toggleUserBlock({
          setActive: !userSelected.isActive,
          userId: userSelected.id
        })
      ).then(() => {
        // Reset the popper
        cancelModal();
      });
    }
  };
  return (
    <LMSModal
      title={titleToDisplay(userSelected)}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      validateAction={toggleBlock}
      cancelAction={cancelModal}
    >
      {textToDisplay(userSelected)}
    </LMSModal>
  );
}
