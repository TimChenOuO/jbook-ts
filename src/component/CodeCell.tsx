import { useEffect, useState } from "react";

import bundler from "../bundler";
import { Cell } from "../redux-state";
import { useAction } from "../hooks/useAction";

import CodeEditor from "./CodeEditor";
import PreviewIframe from "./PreviewIframe";
import Resizable from "./Resizable";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { content, id } = cell;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useAction();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code: output, err } = await bundler(content);
      setCode(output);
      setError(err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue={content}
            onChange={(val) => updateCell(id, val)}
          />
        </Resizable>
        <PreviewIframe code={code} error={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell;

