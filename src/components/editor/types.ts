import { ReactQuillProps } from 'react-quill';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface EditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  gap?: boolean;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}
