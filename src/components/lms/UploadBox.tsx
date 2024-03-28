import { DropzoneProps, useDropzone } from 'react-dropzone';
import { styled, alpha, SxProps } from '@mui/material/styles';
import Iconify from '@src/components/iconify/Iconify';
import { ReactNode } from 'react';

const StyledDropZone = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  flexShrink: 0,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  '&:hover': {
    opacity: 0.72
  }
}));

// ----------------------------------------------------------------------

interface CustomDropzoneProps {
  sx?: SxProps;
  error?: boolean;
  disabled?: boolean;
  placeholder?: ReactNode;
}
type UploadBoxProps = CustomDropzoneProps & DropzoneProps;

export default function UploadBox({
  placeholder = '',
  error,
  disabled,
  sx,
  ...other
}: UploadBoxProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    accept: { 'text/csv': [] },
    multiple: false,
    maxSize: 3000000,
    ...other
  });

  const isError = isDragReject || error;

  return (
    <StyledDropZone
      {...getRootProps()}
      sx={{
        display: 'flex',
        flex: '1 1 0',
        padding: 2,
        height: 'initial',
        maxHeight: 128,
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
    >
      <input {...getInputProps()} />

      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </StyledDropZone>
  );
}
