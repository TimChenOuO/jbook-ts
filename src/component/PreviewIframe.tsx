import { useEffect, useRef } from 'react';

import './previewIframe.scss';
interface PreviewIframeProps {
  code: string
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
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


const PreviewIframe: React.FC<PreviewIframeProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-iframe'>
      <iframe
        title="ifm-code-preview"
        sandbox="allow-scripts"
        srcDoc={html}
        ref={iframeRef}
      />
    </div>
  )
};

export default PreviewIframe;