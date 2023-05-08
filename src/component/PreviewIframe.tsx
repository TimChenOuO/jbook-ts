import { useEffect, useRef } from 'react';

import { useTypedSelector } from '../hooks/useTypedSelector';

import './previewIframe.scss';
interface PreviewIframeProps {
  code: string
  err: string,
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({ code, err }) => {
  const srcDocHtml = useTypedSelector(({ srcDocHtml }) => srcDocHtml);
  const srcDocRef = useRef<any>(srcDocHtml.srcDoc);
  const iframeRef = useRef<any>();
  
  useEffect(() => {
    iframeRef.current.srcdoc = srcDocRef.current;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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