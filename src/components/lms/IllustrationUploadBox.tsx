import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { styled, alpha, SxProps, Theme } from '@mui/material/styles';
import Iconify from '../iconify/Iconify';
import { Box, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';

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
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    maxSize: 3000000,
    disabled: !!file,
    ...other
  });

  const [hover, setHover] = useState(false);
  const hasFile = !!file;
  const isError = isDragReject || error;

  return (
    <StyledDropZone
      {...getRootProps()}
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
      {hasFile && (
        <img
          alt={`${file.name} preview`}
          src={file.preview}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      <input {...getInputProps()} />

      {hasFile && hover && (
        <Box
          component={IconButton}
          onClick={onRemove}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 0,
            opacity: 0.32
          }}
        >
          <Iconify icon="eva:close-fill" width={32} />
        </Box>
      )}

      {!error && !hasFile && (placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />)}
      {error && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
          <Box sx={{ color: 'error.main' }}>{helperText}</Box>
        </Box>
      )}
    </StyledDropZone>
  );
}
