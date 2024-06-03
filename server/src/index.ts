import express from 'express';
import http from 'http';
import cors from 'cors';
import chokidar from 'chokidar';
import { ptyProcess } from './lib/pty.js';
import { io } from './lib/socket.js';
import filesRoutes from './routes/files.js';
import fs from 'fs/promises';
const app = express();

const server = http.createServer(app);
io.attach(server);
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use('/', filesRoutes);
ptyProcess.onData((data) => {
  io.emit('terminal:data', data);
});

chokidar.watch('./src/user').on('all', (event, path) => {
  io.emit('file:refresh', path);
});
io.on('connection', (socket) => {
  socket.on('terminal:write', (data) => {
    if (data) {
      // ptyProcess.write(data + '\r');
      ptyProcess.write(data);
    }
  });

  socket.on(
    'file:write',
    async ({
      path,
      changes,
    }: {
      path: string;
      changes: {
        type: 'removed' | 'added';
        value: string;
        index: number;
      }[];
    }) => {
      try {
        const filePath = `./src/user${path}`;
        let fileContent = await fs.readFile(filePath, 'utf-8');
        changes.forEach((change) => {
          if (change.type === 'removed') {
            const index = fileContent.indexOf(change.value, change.index);
            if (index !== -1) {
              fileContent =
                fileContent.slice(0, index) +
                fileContent.slice(index + change.value.length);
            }
          } else if (change.type === 'added') {
            fileContent =
              fileContent.slice(0, change.index) +
              change.value +
              fileContent.slice(change.index);
          }
        });
        console.log(fileContent);
        await fs.writeFile(filePath, fileContent);
        console.log(`File ${path} updated successfully`);
      } catch (error) {
        console.error(`Error updating file ${path}: `, error);
      }
    }
  );
});
server.listen(PORT, () => {
  console.log(`Server listening at PORT - ${PORT}`);
});
