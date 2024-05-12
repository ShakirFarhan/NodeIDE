import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import styles from './Editor.module.css';

import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#131313',
    backgroundImage: '',
    foreground: '#fff',
    caret: '#fff',
    selection: '#3a3d41',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBackground: '#131313',
    gutterForeground: '#8a919966',
  },
  styles: [],
});
const Editor = ({
  code,
  setCode,
  className,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) => {
  const onChange = useCallback((val: string, viewUpdate: any) => {
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
