import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { User } from '@services/users/interfaces';
import { toggleUserBlock } from '@redux/reducers/usersReducer';

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
      navigate(`/users/profile/${userSelected.id}`);
    }
  };

  const toggleBlock = () => {
    if (userSelected !== null) {
      dispatch(
        toggleUserBlock({
          setActive: !userSelected.isActive,
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
            primary={userSelected?.isActive ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>}
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
