import { Skeleton } from '@mui/material';
import { LazyExoticComponent, Suspense } from 'react';

const LoadableComponent = (Component: LazyExoticComponent<() => JSX.Element>) => {
  const SuspenseSkeletonLayout = (props: Record<string, any>) => (
    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
      <Component {...props} />
    </Suspense>
  );
  return SuspenseSkeletonLayout;
};

export default LoadableComponent;
