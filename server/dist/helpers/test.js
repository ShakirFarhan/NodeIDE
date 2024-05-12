var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function generateFileTree(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const tree = {};
        function buildTree(currentDir, currentTree) {
            return __awaiter(this, void 0, void 0, function* () {
                const files = yield fs.readdir(currentDir);
                for (const file of files) {
                    const filePath = path.join(currentDir, file);
                    const stat = yield fs.stat(filePath);
                    if (stat.isDirectory()) {
                        currentTree[file] = {};
                        yield buildTree(filePath, currentTree[file]);
                    }
                    else {
                        currentTree[file] = null;
                    }
                }
            });
        }
        yield buildTree(directory, tree);
        return tree;
    });
}
