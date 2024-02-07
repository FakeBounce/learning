import { Link } from '@mui/material';
import theme from '@theme';
import { globalNavigationConfigType } from '@utils/navigation/configNavigation';

interface HeaderBreadcrumbItemProps {
  currentPathConfig: globalNavigationConfigType;
  isLast: boolean;
}

export default function HeaderBreadcrumbItem({
  currentPathConfig,
  isLast
}: HeaderBreadcrumbItemProps) {
  return (
    <Link
      color={isLast ? theme.palette.purple[600] : theme.palette.grey[800]}
      fontWeight={isLast ? theme.fonts.weight.medium : theme.fonts.weight.regular}
      href={currentPathConfig.path}
      underline="none"
    >
      {currentPathConfig.title}
    </Link>
  );
}
