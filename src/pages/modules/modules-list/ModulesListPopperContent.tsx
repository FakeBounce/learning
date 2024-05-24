import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Trans } from '@lingui/macro';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Module, ModulesActions } from '@services/modules/interfaces';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';

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

  const handleSeeModule = () => {
    if (moduleSelected !== null) {
      navigate(generatePath(PATH_MODULES.profile, { moduleId: moduleSelected.id }));
    }
  };

  const canDeleteModule = moduleSelected
    ? canDoModuleAction(moduleSelected, ModulesActions.DELETE)
    : false;

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleSeeModule}
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
      {canDeleteModule && (
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
