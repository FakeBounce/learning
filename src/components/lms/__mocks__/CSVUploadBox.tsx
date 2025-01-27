import { DropzoneProps, useDropzone } from 'react-dropzone';
import { styled, SxProps } from '@mui/material/styles';
import Iconify from '@src/components/iconify/Iconify';
import { ReactNode } from 'react';

const StyledDropZone = styled('div')(() => ({
  width: 64,
  height: 64
}));

// ----------------------------------------------------------------------

interface CustomDropzoneProps {
  sx?: SxProps;
  error?: boolean;
  disabled?: boolean;
  placeholder?: ReactNode;
  file?: File | null;
  onDelete?: VoidFunction;
}
type UploadBoxProps = CustomDropzoneProps & DropzoneProps;

export default function CSVUploadBox({
  placeholder = '',
  error,
  disabled,
  sx,
  file,
  onDelete,
  ...other
}: UploadBoxProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: { 'text/csv': [] },
    multiple: false,
    maxSize: 3000000,
    disabled: !!file,
    ...other
  });

  const hasFile = !!file;

  const isError = isDragReject || error;

  return (
    <StyledDropZone
      {...getRootProps()}
      sx={{
        ...sx,
        display: 'flex',
        ...(isDragActive && {
          opacity: 0.72
        }),
        ...(isError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light'
        }),
        ...(hasFile && {
          opacity: 0.48,
          width: 'auto',
          paddingRight: 7,
          borderRadius: (theme) => theme.shape.customBorderRadius.medium,
          '&:hover': {
            opacity: 0.48
          }
        })
      }}
    >
      <input data-testid="upload-box-input" {...getInputProps()} disabled={hasFile} />

      {hasFile && <Iconify icon="eva:file-text-fill" width={28} sx={{ mr: 1 }} />}

      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
      {hasFile && disabled && onDelete && (
        <button
          data-testid="upload-box-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </button>
      )}
    </StyledDropZone>
  );
}
