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
