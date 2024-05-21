import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import ServerErrorIllustration from '@src/components/illustrations/ServerErrorIllustration';

interface IframeDisplayerProps {
  iframeUrl: string;
}

export default function IframeDisplayer({ iframeUrl }: IframeDisplayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [embedAllowed, setEmbedAllowed] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
    };
  }, [loadTimeout]);

  function handleLoad() {
    setIsLoading(false);
    if (loadTimeout) {
      clearTimeout(loadTimeout);
    }
  }

  function setupLoadTimeout() {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
      setEmbedAllowed(false);
    }, 5000); // 10 seconds to load
    setLoadTimeout(timeout);
  }

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setEmbedAllowed(true);
    setupLoadTimeout();
  }, [iframeUrl]); // Reset timeout if URL changes

  function handleError() {
    setHasError(true);
    setIsLoading(false);
  }

  function isValidUrl(urlString: string) {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }

  function handleIframeSrc() {
    if (isValidUrl(iframeUrl)) {
      return iframeUrl;
    }
    return 'about:blank'; // Fallback to a safe blank page
  }

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '56.25%'
      }}
    >
      <iframe
        id="iframe-viewer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: embedAllowed ? 'block' : 'none' // Only display iframe if embedding is allowed
        }}
        src={handleIframeSrc()}
        title="PDF viewer"
        frameBorder="0"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)' // Optional: slightly white-transparent background
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {hasError && !embedAllowed && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flex: 1,
              gap: 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ServerErrorIllustration maxHeight={'60%'} maxWidth={'60%'} />

            <Typography variant="h5" color="error">
              <Trans>Impossible d'accéder au contenu</Trans>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
