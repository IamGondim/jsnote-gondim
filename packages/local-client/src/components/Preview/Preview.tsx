import React, { useEffect, useRef } from 'react';
import styles from './Preview.module.scss';

interface PreviewProps {
  code: string;
  errorMessage?: string;
}

const html = `
    <html>
      <head>
        <style>html {background-color: white;}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
          window.addEventListener('message', event => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({
  code,
  errorMessage
}) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50)
  }, [code]);

  return (
    <div className={styles.previewWrapper}>
      <iframe
        className={styles.preview}
        title='preview'
        ref={iframeRef}
        srcDoc={html}
        sandbox='allow-scripts'
      />
      {
        errorMessage &&
        <div className={styles.previewError}>
          {errorMessage}
        </div>
      }
    </div>
  );
};