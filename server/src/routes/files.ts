import express from 'express';
import { generateFileTree } from '../helpers/files.js';
import fs from 'fs/promises';
const router = express.Router();
router.get('/files', async (req, res) => {
  const tree = await generateFileTree('./user');
  res.json({ tree });
});

router.get('/file/content', async (req, res) => {
  const { path } = req.query;
  if (!path) return res.status(400).json({ message: 'Provide path' });
  const content = await fs.readFile(`./user${path}`, 'utf-8');
  console.log('here' + content);
  res.status(200).json({ content });
});
export default router;
