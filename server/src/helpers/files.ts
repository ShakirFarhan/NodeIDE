import fs from 'fs/promises';
import path from 'path';
import uniqid from 'uniqid';
// Generate's Folder Structure

interface TreeNode {
  name: string;
  items: any[];
  isFolder: boolean;
  id: string;
}
export async function generateFileTree(directory: string) {
  const tree: TreeNode = {
    name: 'root',
    isFolder: true,
    items: [],
    id: uniqid(),
  };
  async function buildTree(currDir: string, parentNode: TreeNode) {
    const files = await fs.readdir(currDir);
    for (const file of files) {
      const filePath = path.join(currDir, file);
      const stat = await fs.stat(filePath);

      const node = {
        name: file,
        isFolder: stat.isDirectory(),
        items: [],
        id: uniqid(),
      };
      parentNode.items.push(node);

      if (stat.isDirectory()) {
        await buildTree(filePath, node);
      }
    }
  }
  await buildTree(directory, tree);
  return tree;
}
