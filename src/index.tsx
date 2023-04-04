import React, { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./component/code-editor";

const App = () => {
  const [input, setInput] = useState('');
  // const [code, setCode] = useState('');
  const ref = useRef<any>();
  const iframeRef = useRef<any>();
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
    // console.log(service);
  }
  useEffect(() => {
    startService();
  },[])
  const onClick = async () => {
    iframeRef.current.srcdoc = html;
    const res = await ref.current?.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input),
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
        // DEBUG: true,
      }
    })
    // setCode(res?.outputFiles[0]?.text);
    iframeRef.current.contentWindow.postMessage(res?.outputFiles[0]?.text, '*');
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (e) => {
            try {
              eval(e.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              throw err;
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return <div>
    <CodeEditor
      initValue="const a = 1;"
      onChange={(val) => setInput(val)}
    />
    <textarea value={input} onChange={e=>setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    {/* <pre>{code}</pre> */}
    <iframe title="ifm-code-preview" sandbox="allow-scripts" srcDoc={html} ref={iframeRef} />
  </div>
}

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />)
// ReactDOM.render(<App />, container);

