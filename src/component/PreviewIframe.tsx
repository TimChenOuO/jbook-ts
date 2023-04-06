import { useEffect, useRef } from 'react';

interface PreviewIframeProps {
  code: string
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


const PreviewIframe: React.FC<PreviewIframeProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      title="ifm-code-preview"
      sandbox="allow-scripts"
      srcDoc={html}
      ref={iframeRef}
    />
  )
};

export default PreviewIframe;