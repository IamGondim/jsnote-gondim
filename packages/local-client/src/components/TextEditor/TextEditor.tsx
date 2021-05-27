import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.scss';
import { Cell } from '../../redux';
import { useActions } from '../../hooks/useActions';

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  cell
}) => {
  const { updateCell } = useActions();

  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      if (ref.current && target && ref.current.contains(target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  const onChange = (value: string | undefined) => {
    updateCell(cell.id, value || '');
  };

  if (editing) {
    return (
      <div className='textEditor' ref={ref}>
        <MDEditor value={cell.content} onChange={onChange} />
      </div>
    )
  }
  return (
    <div className='textEditor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};