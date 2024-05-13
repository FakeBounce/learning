import { IconButton } from '@mui/material';
import { ReactNode, useRef } from 'react';
import { closeSnackbar, SnackbarProvider as NotistackProvider } from 'notistack';
import StyledNotistack from './styles';

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const notistackRef = useRef(null);

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={(key) => (
          <IconButton
            size="small"
            onClick={() => closeSnackbar(key)}
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
              borderRadius: 0
            }}
          />
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}
