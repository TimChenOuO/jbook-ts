import { useEffect, useRef } from 'react';

import './previewIframe.scss';
// import srcDocHTML from './srcDoc.html';
interface PreviewIframeProps {
  code: string
  err: string,
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({ code, err }) => {
  const srcDocRef = useRef<any>('');
  const iframeRef = useRef<any>();

  useEffect(() => {
    const fetchHtml = async () => {
      const response = await fetch('srcDoc.html');
      const text = await response.text();
      srcDocRef.current = text;
    }
    fetchHtml();
  }, [])
  
  useEffect(() => {
    if (srcDocRef.current === '') return;
    iframeRef.current.srcdoc = srcDocRef.current;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-iframe'>
      <iframe
        title="ifm-code-preview"
        sandbox="allow-scripts"
        srcDoc={srcDocRef.current}
        ref={iframeRef}
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  )
};

export default PreviewIframe;