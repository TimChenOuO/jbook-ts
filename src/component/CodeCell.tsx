import { useEffect } from "react";
import { Cell } from "../redux-state";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

import CodeEditor from "./CodeEditor";
import PreviewIframe from "./PreviewIframe";
import Resizable from "./Resizable";

import './codeCell.scss';
import useCumulativeCode from "../hooks/useCumulativeCode";



interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { content, id } = cell;

  const { updateCell, createBundle } = useAction();
  const bundle = useTypedSelector(({ bundles }) => bundles![id]);
  const srcDocLoading = useTypedSelector(({ srcDocHtml }) => srcDocHtml.loading);
  const cumulativeCode = useCumulativeCode(id);

  // console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue={content}
            onChange={(val) => updateCell(id, val)}
          />
        </Resizable>
        {/* weird bug can't combin loading logic */}
        <div className="progress-wrapper">
          {(!bundle || bundle.loading || srcDocLoading) ? (
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>
              </div>
          ) : (
            <PreviewIframe code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell;

