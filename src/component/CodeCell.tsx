import { useState } from "react";

import CodeEditor from "./CodeEditor";
import PreviewIframe from "./PreviewIframe";

import bundler from "../bundler";

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  
  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  }

  return <div>
    <CodeEditor
      initValue="const a = 1;"
      onChange={(val) => setInput(val)}
    />
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <PreviewIframe code={code} />
  </div>
}

export default CodeCell;

