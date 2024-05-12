import { useState } from 'react';
import styles from './Folder.module.css';
import useTraversTree from '../../hooks/useTraverseTree';
import { TreeNode } from '../../utils/types';
import { AiOutlineFolder, AiOutlineFolderOpen } from 'react-icons/ai';
import { LuFolderPlus } from 'react-icons/lu';
import { PiFilePlusBold } from 'react-icons/pi';
const Folder = ({
  nodes,
  onSelect,
  path,
}: {
  nodes: TreeNode;
  onSelect: (path: string) => void;
  path: string;
}) => {
  const [expanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const { insertNode } = useTraversTree();
  const handleNew = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    e.stopPropagation();

    setShowInput({
      isFolder,
      visible: true,
    });
    setIsExpanded(true);
  };
  const onAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name) {
      const tree = insertNode(nodes, nodes.id, {
        name,
        isFolder: showInput.isFolder,
      });
      if (showInput.isFolder) {
        // socket.emit('terminal:write', `mkdir ${name}`);
      }
      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  if (nodes.isFolder)
    return (
      <div className={styles.folder__container}>
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className={styles.root__folder}
        >
          <button className={styles.name}>
            {expanded ? (
              <AiOutlineFolderOpen className={styles.icons} />
            ) : (
              <AiOutlineFolder className={styles.icons} />
            )}
            <span>{nodes.name}</span>
          </button>
          <div>
            <button onClick={(e) => handleNew(e, true)}>
              <LuFolderPlus />
            </button>
            <button onClick={(e) => handleNew(e, false)}>
              <PiFilePlusBold />
            </button>
          </div>
        </div>
        <div style={{ display: expanded ? 'block' : 'none' }}>
          {showInput.visible && (
            <>
              <div className={styles.input}>
                {showInput.isFolder ? '📁' : '📄'}
                <input
                  type="text"
                  name="input"
                  autoFocus
                  onKeyDown={onAdd}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onChange={handleOnChange}
                  value={name}
                />
              </div>
            </>
          )}
          {nodes.items &&
            nodes.items.map((item) => {
              return (
                <Folder
                  path={path + '/' + item.name}
                  onSelect={onSelect}
                  nodes={item}
                />
              );
            })}
        </div>
      </div>
    );
  else {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(path);
        }}
        style={{ marginLeft: '10px' }}
      >
        <button className={styles.name}>
          📄
          <span>{nodes.name}</span>
        </button>
      </div>
    );
  }
};

export default Folder;
