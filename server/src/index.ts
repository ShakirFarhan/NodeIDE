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

  socket.on('file:write', async ({ path, code }) => {
    console.log(path, code);
    await fs.writeFile(`./src/user${path}`, code);
  });
});
server.listen(PORT, () => {
  console.log(`Server listening at PORT - ${PORT}`);
});
