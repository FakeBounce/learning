import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { User } from '@services/users/interfaces';
import { PATH_USERS } from '@utils/navigation/paths';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

interface UsersListPopperContentProps {
  handleToggleBlock: () => void;
  userSelected: User | null;
}
export default function UsersListPopperContent({
  handleToggleBlock,
  userSelected
}: UsersListPopperContentProps) {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canBlockUser = isAuthorizedByPermissionsTo(pageType, PermissionEnum.BLOCK_UNBLOCK);

  const goToUserProfile = () => {
    if (userSelected !== null) {
      navigate(generatePath(PATH_USERS.profile, { userId: String(userSelected.id) }));
    }
  };

  return (
    <Paper elevation={10} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToUserProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        {canBlockUser && (
          <ListItemButton onClick={handleToggleBlock}>
            <ListItemText
              primary={userSelected?.isActive ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>}
            />
          </ListItemButton>
        )}
      </ListItem>
    </Paper>
  );
}
