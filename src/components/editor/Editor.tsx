import '@utils/highlightjs';
import ReactQuill from 'react-quill';
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';
import { Theme } from '@mui/material/styles';

export default function Editor({
  id = 'lms-editor-minimal',
  error,
  value,
  onChange,
  gap = false,
  helperText,
  disabled,
  sx,
  ...other
}: EditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme: Theme) => `solid 1px ${theme.palette.error.main}`
          }),
          ...sx
        }}
      >
        <EditorToolbar disabled={disabled} id={id} withGaps={gap} />

        <ReactQuill
          value={value}
          readOnly={disabled}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
