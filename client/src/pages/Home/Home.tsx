import Editor from '../../components/Editor/Editor';
import FolderStructure from '../../components/FolderStructure/FolderStructure';
import Terminal from '../../components/Terminal/Terminal';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import socket from '../../lib/socket';
import { calculateDiff } from '../../utils/calculateDiff';
function Home() {
  const [code, setCode] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [terminalVisible, setTerminalVisible] = useState(false);

  const handleOnSelect = (path: string) => {
    setSelectedFile(path);
  };

  const handleTerminal = () => {
    setTerminalVisible((prev) => !prev);
  };
  const getFileContent = async () => {
    const response = await fetch(
      `http://localhost:8000/file/content?path=${selectedFile}`
    );
    const data = await response.json();
    setCode(data.content);
    setFileContent(data.content);
  };

  useEffect(() => {
    if (selectedFile) {
      getFileContent();
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const timer = setTimeout(() => {
        const changes = calculateDiff(fileContent, code);

        if (changes.length > 0) {
          socket.emit('file:write', {
            path: selectedFile,
            changes,
          });

          setFileContent(code);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, fileContent]);
  return (
    <div className={styles.main__container}>
      <div className={styles.folders__container}>
        <h2>NodeIDE</h2>
        <FolderStructure onSelect={handleOnSelect} />
      </div>
      <div className={styles.editor}>
        <div className={styles.editor__header}>
          <div>
            {selectedFile && <p>{selectedFile.replace(/\//g, ' > ')}</p>}
          </div>

          <div>
            <button onClick={handleTerminal}>
              {terminalVisible ? 'Close' : 'Open'} Terminal
            </button>
          </div>
        </div>

        <div className={styles.code__editor}>
          {selectedFile && <Editor code={code} setCode={setCode} />}
        </div>
        <div
          style={{
            visibility: terminalVisible ? 'visible' : 'hidden',
          }}
          className={styles.editor__terminal}
        >
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default Home;
