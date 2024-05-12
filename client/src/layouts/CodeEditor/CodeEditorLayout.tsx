import React from 'react';
import styles from './EditorLayout.module.css';
import FolderStructure from '../../components/FolderStructure/FolderStructure';
import {} from 'react';
import { Outlet } from 'react-router-dom';
const CodeEditorLayout = () => {
  return (
    <div>
      {/* <FolderStructure /> */}

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CodeEditorLayout;
