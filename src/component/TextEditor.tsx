import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

import './textEditor.scss';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# header');
  
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
      <MDEditor value={value} onChange={(v) => setValue(v || '')} />
    </div>
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={value}
        />
      </div>
    </div>
  )
}

export default TextEditor;