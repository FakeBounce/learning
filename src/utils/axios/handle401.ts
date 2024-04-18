import { resetApp } from '@redux/actions/globalActions';

export const handleRefresh401 = () => {
  // Dynamically import store to avoid circular dependency
  import('@redux/store')
    .then(({ store }) => {
      store.dispatch(resetApp());
    })
    .catch((error) => {
      console.error('Error importing store:', error);
    });
};
