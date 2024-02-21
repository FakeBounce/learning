import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { globalNavigationConfigType } from '@utils/navigation/configNavigation';

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
    <Link
      color={isLast ? theme.palette.secondary.dark : theme.palette.grey[800]}
      fontWeight={isLast ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular}
      href={currentPathConfig.path}
      underline="none"
    >
      {currentPathConfig.title}
    </Link>
  );
}
