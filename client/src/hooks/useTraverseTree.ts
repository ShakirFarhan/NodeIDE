import { TreeNode } from '../utils/types';

const useTraversTree = () => {
  function insertNode(
    tree: TreeNode,
    folderId: string,
    item: { name: string; isFolder: boolean }
  ) {
    console.log(tree.id, folderId, item.isFolder, item.name);
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: Date.now().toString(),
        name: item.name,
        isFolder: item.isFolder,
        items: [],
      });
      return tree;
    }

    let newItems: TreeNode[] = [];
    newItems = tree.items.map((node) => {
      return insertNode(node, folderId, item);
    }) as TreeNode[];

    return { ...tree, items: newItems };
  }

  // function deleteNode(
  //   tree: TreeNode,
  //   folderId: string,
  //   item: { isFolder: boolean; id: string }
  // ) {
  //   // if (tree.id === folderId) {
  //   //   return {};
  //   // }
  // }
  return { insertNode };
};
export default useTraversTree;
