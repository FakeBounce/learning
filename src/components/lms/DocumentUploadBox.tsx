import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { styled, alpha, SxProps, Theme } from '@mui/material/styles';
import Iconify from '../iconify/Iconify';
import { Box, IconButton, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { Trans } from '@lingui/macro';

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface DocumentUploadBoxProps extends DropzoneOptions {
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

export default function DocumentUploadBox({
  placeholder,
  error,
  disabled,
  file,
  helperText,
  onRemove,
  sx,
  ...other
}: DocumentUploadBoxProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    maxSize: 3000000,
    disabled: error ? false : !!file,
    ...other
  });

  const [hover, setHover] = useState(false);

  const hasFile = !!file;
  const isError = isDragReject || error;
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
        <input disabled={disabled} {...getInputProps()} />
        {hasFile ? (
          <>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'underline',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Iconify icon="mdi:file-outline" width={18} /> {file.name}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">
            <Trans>Sélectionnez un fichier</Trans>
          </Typography>
        )}
        {hasFile && hover && (
          <Box
            component={IconButton}
            data-testid="illustration-upload-box-remove"
            onClick={onRemove}
            display="flex"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 0,
              zIndex: 2,
              color: (theme) => theme.palette.error.main
            }}
          >
            <Iconify icon="eva:close-fill" width={32} />
          </Box>
        )}
        {helperText && <Typography color="error">{helperText}</Typography>}
      </StyledDropZone>
    </>
  );
}
