import { Breadcrumbs } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import HeaderBreadcrumbItem from '@src/components/layouts/main-layout/HeaderBreadcrumbItem';
import { globalNavigationConfig } from '@utils/navigation/configNavigation';
import { useLocation } from 'react-router-dom';

export default function HeaderBreadcrumbs() {
  const { pathname } = useLocation();

  // Function that will generate breadcumbs array depending of the location
  // It import globalNavigationConfig from @utils/navigation/configNavigation and use title as value
  // It will return an array of ReactNode
  const generateBreadcrumbs = () => {
    if (pathname === '/') {
      return <HeaderBreadcrumbItem currentPathConfig={globalNavigationConfig[0]} isLast={true} />;
    }

    const pathArray = pathname.split('/');
    const breadCrumbs = pathArray.map((_, index) => {
      const currentPath = pathArray.slice(0, index + 1).join('/') || '/';
      const currentPathConfig = globalNavigationConfig.find((config) => {
        if (config.path && config.path.includes(':')) {
          const baseRoute = config.path.split(':')[0];
          return currentPath.startsWith(baseRoute);
        }

        return config.path === currentPath;
      });
      if (currentPathConfig) {
        const isLast = pathArray.length > 1 && index === pathArray.length - 1;
        return (
          <HeaderBreadcrumbItem
            key={currentPathConfig.path}
            currentPathConfig={{ ...currentPathConfig, path: currentPath }}
            isLast={isLast}
          />
        );
      }
      return null;
    });
    return breadCrumbs.filter((item) => item !== null);
  };

  return (
    <Breadcrumbs separator={<Iconify width={16} icon="mdi:chevron-right" />} sx={{ ml: 4, mt: 2 }}>
      {generateBreadcrumbs()}
    </Breadcrumbs>
  );
}
