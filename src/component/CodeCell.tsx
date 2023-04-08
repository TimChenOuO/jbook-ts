import { useEffect, useState } from "react";

import CodeEditor from "./CodeEditor";
import PreviewIframe from "./PreviewIframe";

import bundler from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initValue="const a = 1;"
            onChange={(val) => setInput(val)}
          />
        </Resizable>
        <PreviewIframe code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell;

