import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useAction } from "../hooks/useAction";

import './textEditor.scss';
import { Cell } from "../redux-state";

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { content, id } = cell;
  const { updateCell } = useAction();
  const [editing, setEditing] = useState(false);
  // const [value, setValue] = useState('# header');
  
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current?.contains(e.target as Node)) return;
      setEditing(false);
    }
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    }
  }, [])

  if (editing) {
    return <div className="text-editor" ref={ref}>
      <MDEditor value={content} onChange={(v) => updateCell(id, (v || ''))} />
    </div>
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={content || 'Click to edit'}
        />
      </div>
    </div>
  )
}

export default TextEditor;