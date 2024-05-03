import LMSModal from '@src/components/lms/LMSModal';
import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { enqueueSnackbar } from 'notistack';
import { deleteRoleAction } from '@redux/actions/rolesActions';
import { removeRoleFromList, resetDeleteRoleState } from '@redux/reducers/rolesReducer';

interface RolesListModalProps {
  roleSelected: any;
  isModalOpen: boolean;
  setIsModalOpen: (_value: boolean) => void;
  cancelModal: () => void;
}

export default function RolesListModal({
  roleSelected,
  isModalOpen,
  setIsModalOpen,
  cancelModal
}: RolesListModalProps) {
  const dispatch = useAppDispatch();
  const { rolesDeleteLoading } = useAppSelector((state) => state.roles.rolesDelete);

  const deleteRole = async () => {
    if (roleSelected !== null) {
      try {
        await dispatch(deleteRoleAction({ id: roleSelected.id }));
        dispatch(removeRoleFromList(roleSelected.id));
        cancelModal();
      } catch (error) {
        enqueueSnackbar(error as string, { variant: 'error' });
        dispatch(resetDeleteRoleState());
      }
    }
  };

  return (
    <LMSModal
      title={<Trans>Supprimer un rôle</Trans>}
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      isLoading={rolesDeleteLoading}
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
