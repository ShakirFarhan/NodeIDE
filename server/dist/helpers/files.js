var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import path from 'path';
import uniqid from 'uniqid';
export function generateFileTree(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const tree = {
            name: 'root',
            isFolder: true,
            items: [],
            id: uniqid(),
        };
        function buildTree(currDir, parentNode) {
            return __awaiter(this, void 0, void 0, function* () {
                const files = yield fs.readdir(currDir);
                for (const file of files) {
                    const filePath = path.join(currDir, file);
                    const stat = yield fs.stat(filePath);
                    const node = {
                        name: file,
                        isFolder: stat.isDirectory(),
                        items: [],
                        id: uniqid(),
                    };
                    parentNode.items.push(node);
                    if (stat.isDirectory()) {
                        yield buildTree(filePath, node);
                    }
                }
            });
        }
        yield buildTree(directory, tree);
        return tree;
    });
}
