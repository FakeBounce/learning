import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { styled, alpha, SxProps, Theme } from '@mui/material/styles';
import Iconify from '../iconify/Iconify';
import { Box, IconButton, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import MaintenanceIllustration from '@src/components/illustrations/MaintenanceIllustration';
import { Trans } from '@lingui/macro';

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface IllustrationUploadBoxProps extends DropzoneOptions {
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: ReactNode;
  helperText?: ReactNode;
  file?: CustomFile | null;
  files?: File[];
  onUpload?: VoidFunction;
  onRemove?: VoidFunction;
}

const StyledDropZone = styled('div')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  minWidth: 64,
  minHeight: 64,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  '&:hover': {
    opacity: 0.72
  }
}));

// ----------------------------------------------------------------------

export default function IllustrationUploadBox({
  placeholder,
  error,
  disabled,
  file,
  helperText,
  onRemove,
  sx,
  ...other
}: IllustrationUploadBoxProps) {
  const [hover, setHover] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    maxSize: 3000000,
    disabled: error || imageError ? false : !!file,
    ...other
  });

  const isError = isDragReject || error;

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setImageError(false);
  }, [file]);

  const handleRemoveFile = () => {
    onRemove && onRemove();
    setImageError(false);
  };

  return (
    <>
      <StyledDropZone
        {...getRootProps()}
        data-testid="illustration-upload-box"
        sx={{
          flex: '1 1 0',
          ...(isDragActive && {
            opacity: 0.72
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light'
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none'
          }),
          ...sx
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {file && (
          <img
            alt={`${file.name} preview`}
            src={file instanceof File ? file.preview : file}
            onError={handleImageError}
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {imageError && (
          <Box
            sx={{
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
            <MaintenanceIllustration maxHeight={'60%'} maxWidth={'60%'} />

            <Typography variant="h5" color="error">
              <Trans>Impossible d'accéder au contenu</Trans>
            </Typography>
          </Box>
        )}
        <input disabled={disabled} {...getInputProps()} />
        {file && hover && !imageError && (
          <Box
            component={IconButton}
            data-testid="illustration-upload-box-remove"
            onClick={handleRemoveFile}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 0,
              opacity: 0.32,
              zIndex: 2
            }}
          >
            <Iconify icon="eva:close-fill" width={32} />
          </Box>
        )}
        {!error && !file && (placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />)}{' '}
        {error && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
            <Box sx={{ color: 'error.main' }}>{helperText}</Box>
          </Box>
        )}
      </StyledDropZone>
    </>
  );
}
