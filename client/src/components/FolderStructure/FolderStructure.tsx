import styles from './FolderStructure.module.css';
import Folder from '../Folder/Folder';
import { useEffect, useState } from 'react';
import { TreeNode } from '../../utils/types';
import socket from '../../lib/socket';
const FolderStructure = ({
  onSelect,
}: {
  onSelect: (path: string) => void;
}) => {
  const [folderStructure, setFolderStructure] = useState<TreeNode | null>(null);
  const getFiles = async () => {
    const data = await fetch('http://localhost:8000/files');

    const response = await data.json();
    if (response) {
      setFolderStructure(response.tree as unknown as TreeNode);
    }
  };
  useEffect(() => {
    getFiles();
  }, []);
  useEffect(() => {
    socket.on('file:refresh', getFiles);
    return () => {
      socket.off('file:refresh', getFiles);
    };
  }, []);

  return (
    <div className={styles.container}>
      {folderStructure && (
        <Folder path="" onSelect={onSelect} nodes={folderStructure} />
      )}
    </div>
  );
};

export default FolderStructure;
