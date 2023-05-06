import { useEffect } from "react";
import { Cell } from "../redux-state";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

import CodeEditor from "./CodeEditor";
import PreviewIframe from "./PreviewIframe";
import Resizable from "./Resizable";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { content, id } = cell;

  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector(({ bundles }) => bundles[id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(id, content);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [content, id, createBundle])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue={content}
            onChange={(val) => updateCell(id, val)}
          />
        </Resizable>
        {bundle && <PreviewIframe code={bundle.code} err={bundle.err} />}
      </div>
    </Resizable>
  )
}

export default CodeCell;

