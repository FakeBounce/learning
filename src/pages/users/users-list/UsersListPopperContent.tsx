import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { User } from '@services/connected-user/interfaces.ts';
import { toggleUserBlock } from '@redux/reducers/usersReducer.ts';

interface UsersListPopperContentProps {
  setAnchorEl: (value: HTMLElement | null) => void;
  setUserSelected: (value: User | null) => void;
  userSelected: User | null;
}
export default function UsersListPopperContent({
  setAnchorEl,
  setUserSelected,
  userSelected
}: UsersListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToUserProfile = () => {
    if (userSelected !== null) {
      navigate(`/users/profile/${userSelected.id}`, { state: { user: userSelected } });
    }
  };

  const toggleBlock = () => {
    if (userSelected !== null) {
      dispatch(
        toggleUserBlock({
          setActive: !userSelected.is_active,
          userId: userSelected.id
        })
      ).then(() => {
        // Reset the popper
        setAnchorEl(null);
        setUserSelected(null);
      });
    }
  };

  return (
    <Paper elevation={10} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToUserProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={toggleBlock}>
          <ListItemText
            primary={userSelected?.is_active ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>}
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
