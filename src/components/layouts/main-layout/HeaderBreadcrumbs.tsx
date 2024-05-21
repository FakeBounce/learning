import { Breadcrumbs } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import HeaderBreadcrumbItem from '@src/components/layouts/main-layout/HeaderBreadcrumbItem';
import { globalNavigationConfig } from '@utils/navigation/configNavigation';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

export default function HeaderBreadcrumbs() {
  const { pathname } = useLocation();

  /** Function that will generate breadcumbs array depending of the location
   * It import globalNavigationConfig from @utils/navigation/configNavigation and use title as value
   * It will return an array of ReactNode
   **/
  const generateBreadcrumbs = () => {
    const breadcrumbs: ReactNode[] = [
      <HeaderBreadcrumbItem
        key="/"
        currentPathConfig={globalNavigationConfig[0]}
        isLast={pathname === '/'}
      />
    ];

    if (pathname !== '/') {
      const pathSegments = pathname.split('/').filter(Boolean);
      let accumulatedPath = '';

      const dynamicBreadcrumbs = pathSegments
        .map((segment, index) => {
          accumulatedPath += `/${segment}`;
          const isLast = index === pathSegments.length - 1;

          const currentPathConfig = globalNavigationConfig.find((config) => {
            if (config.path.includes(':')) {
              // More robust checking for dynamic paths
              const regex = new RegExp('^' + config.path.replace(/:[^\s/]+/g, '([^/]+)') + '$');
              return regex.test(accumulatedPath);
            }
            return config.path === accumulatedPath;
          });

          if (currentPathConfig) {
            return (
              <HeaderBreadcrumbItem
                key={currentPathConfig.path}
                currentPathConfig={{ ...currentPathConfig, path: accumulatedPath }}
                isLast={isLast}
              />
            );
          }
          return null;
        })
        .filter(Boolean);

      breadcrumbs.push(...dynamicBreadcrumbs);
    }

    return breadcrumbs;
  };

  return (
    <Breadcrumbs separator={<Iconify width={16} icon="mdi:chevron-right" />} sx={{ ml: 4, mt: 2 }}>
      {generateBreadcrumbs()}
    </Breadcrumbs>
  );
}
