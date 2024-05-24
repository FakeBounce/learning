import { StyledEditorToolbar } from './styles';

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video'
];

type EditorToolbarProps = {
  id: string;
  withGaps?: boolean;
  disabled?: boolean;
};

export default function EditorToolbar({ id, withGaps, disabled, ...other }: EditorToolbarProps) {
  return (
    <StyledEditorToolbar {...other}>
      <div id={id}>
        <div className="ql-formats">
          <button type="button" className="ql-bold" disabled={disabled} />
          <button type="button" className="ql-italic" disabled={disabled} />
          <button type="button" className="ql-underline" disabled={disabled} />
          {withGaps && <button type="button" className="ql-strike" disabled={disabled} />}
        </div>

        <div className="ql-formats">
          <button type="button" className="ql-list" value="ordered" disabled={disabled} />
          <button type="button" className="ql-list" value="bullet" disabled={disabled} />
        </div>

        <div className="ql-formats">
          <button type="button" className="ql-direction" value="rtl" disabled={disabled} />
          <select className="ql-align" disabled={disabled} />
        </div>

        <div className="ql-formats">
          <button type="button" className="ql-link" disabled={disabled} />
          <button type="button" className="ql-image" disabled={disabled} />
          <button type="button" className="ql-video" disabled={disabled} />
        </div>
      </div>
    </StyledEditorToolbar>
  );
}
