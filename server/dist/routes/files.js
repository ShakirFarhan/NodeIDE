var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { generateFileTree } from '../helpers/files.js';
import fs from 'fs/promises';
const router = express.Router();
router.get('/files', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tree = yield generateFileTree('./user');
    res.json({ tree });
}));
router.get('/file/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { path } = req.query;
    if (!path)
        return res.status(400).json({ message: 'Provide path' });
    const content = yield fs.readFile(`./user${path}`, 'utf-8');
    console.log('here' + content);
    res.status(200).json({ content });
}));
export default router;
