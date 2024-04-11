import { useTheme } from '@mui/material/styles';
import { Group } from '@services/groups/interfaces';
import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

interface GroupsListPopperContentProps {
  groupSelected: Group | null;
  handleDelete: () => void;
}

export default function GroupsListPopperContent({ groupSelected, handleDelete }: GroupsListPopperContentProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canUpdateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
  const canDeleteGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.DELETE);

  const handleUpdate = () => {
    if (groupSelected !== null) {
      navigate(PATH_GROUPS.update);
    }
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      {canUpdateGroup && (
        <ListItemButton onClick={handleUpdate} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
          <ListItemText primary={<Trans>Modifier</Trans>} />
        </ListItemButton>
      )}
      {canDeleteGroup && (
        <ListItemButton onClick={handleDelete} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
          <ListItemText primary={<Trans>Supprimer</Trans>} />
        </ListItemButton>
      )}
    </ListItem>
  )
}