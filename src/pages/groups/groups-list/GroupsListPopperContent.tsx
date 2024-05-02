import { Group } from '@services/groups/interfaces';
import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { useAppDispatch } from '@redux/hooks';
import { setCurrentGroup } from '@redux/reducers/groupsReducer';

interface GroupsListPopperContentProps {
  groupSelected: Group | null;
  handleDelete: () => void;
}

export default function GroupsListPopperContent({
  groupSelected,
  handleDelete
}: GroupsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canUpdateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
  const canDeleteGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.DELETE);

  const handleUpdate = () => {
    if (groupSelected !== null) {
      dispatch(setCurrentGroup(groupSelected));
      navigate(generatePath(PATH_GROUPS.update, { groupId: groupSelected.id }));
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      {canUpdateGroup && (
        <ListItemButton
          onClick={handleUpdate}
          sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
        >
          <ListItemText primary={<Trans>Modifier</Trans>} />
        </ListItemButton>
      )}
      {canDeleteGroup && (
        <ListItemButton
          onClick={handleDelete}
          sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
        >
          <ListItemText primary={<Trans>Supprimer</Trans>} />
        </ListItemButton>
      )}
    </ListItem>
  );
}
