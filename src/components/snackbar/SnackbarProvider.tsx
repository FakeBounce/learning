import { ReactNode, useRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import StyledNotistack from './styles';
import SnackbarIcon from './SnackbarIcon';

// ----------------------------------------------------------------------

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const notistackRef = useRef(null);

  // const onClose = (key: number) => () => {
  //     if(notistackRef.current !== null)
  //     {
  //       notistackRef.current?.closeSnackbar(key);
  //     }
  // };

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={300000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        iconVariant={{
          info: <SnackbarIcon icon="eva:info-fill" color="info" />,
          success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
          warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
          error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />
        }}
        // // With close as default
        // action={(key: number) => (
        //   <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
        //     <Iconify icon="eva:close-fill" />
        //   </IconButton>
        // )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}
