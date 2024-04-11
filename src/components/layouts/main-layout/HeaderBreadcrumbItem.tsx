import { useTheme } from '@mui/material/styles';
import { globalNavigationConfigType } from '@utils/navigation/configNavigation';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

interface HeaderBreadcrumbItemProps {
  currentPathConfig: globalNavigationConfigType;
  isLast: boolean;
}

export default function HeaderBreadcrumbItem({
  currentPathConfig,
  isLast
}: HeaderBreadcrumbItemProps) {
  const theme = useTheme();
  return (
    <NavLink to={currentPathConfig.path}>
      <Box
        component={'div'}
        color={isLast ? theme.palette.secondary.main : theme.palette.grey[800]}
        fontWeight={isLast ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular}
      >
        {currentPathConfig.title}
      </Box>
    </NavLink>
  );
}
