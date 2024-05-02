import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Trans } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Module } from '@services/modules/interfaces';

interface ModulesListPopperContentProps {
  moduleSelected: Module | null;
  handleDelete: () => void;
  handleDuplicate: () => void;
}

export default function ModulesListPopperContent({
  moduleSelected,
  handleDelete,
  handleDuplicate
}: ModulesListPopperContentProps) {
  const navigate = useNavigate();

  const handleChangeView = () => {
    if (moduleSelected !== null) {
      navigate(generatePath(PATH_MODULES.profile, { moduleId: moduleSelected.id }));
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleChangeView}
        sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
      >
        <ListItemText primary={<Trans>Voir</Trans>} />
      </ListItemButton>
      <ListItemButton
        onClick={handleDuplicate}
        sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
      >
        <ListItemText primary={<Trans>Duppliquer</Trans>} />
      </ListItemButton>{' '}
      <ListItemButton
        onClick={handleDelete}
        sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
      >
        <ListItemText primary={<Trans>Supprimer</Trans>} />
      </ListItemButton>
    </ListItem>
  );
}
