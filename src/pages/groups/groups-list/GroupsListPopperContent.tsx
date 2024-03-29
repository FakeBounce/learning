import { useTheme } from '@mui/material/styles';
import { Group } from '@services/groups/interfaces';
import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';

interface GroupsListPopperContentProps {
  groupSelected: Group | null;
  handleDelete: () => void;
}

export default function GroupsListPopperContent({ groupSelected, handleDelete }: GroupsListPopperContentProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleChangeView = () => {
    if (groupSelected !== null) {
      navigate(PATH_GROUPS.update);
    }
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={handleChangeView} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
        <ListItemText primary={<Trans>Modifier</Trans>} />
      </ListItemButton>
      <ListItemButton onClick={handleDelete} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
        <ListItemText primary={<Trans>Supprimer</Trans>} />
      </ListItemButton>
    </ListItem>
  )
}