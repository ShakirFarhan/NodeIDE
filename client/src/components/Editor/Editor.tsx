import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import styles from './Editor.module.css';

import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

const Editor = ({
  code,
  setCode,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) => {
  const onChange = useCallback((val: string) => {
    setCode(val);
  }, []);

  return (
    <CodeMirror
      style={{ color: 'black', backgroundColor: 'grey', border: 'none' }}
      height="96vh"
      value={code}
      onChange={onChange}
      theme={vscodeDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        },
      })}
      className={styles.code__mirror}
    />
  );
};

export default Editor;
