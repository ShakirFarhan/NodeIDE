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
    socket.on('file:write', (_a) => __awaiter(void 0, [_a], void 0, function* ({ path, code }) {
        console.log(path, code);
        yield fs.writeFile(`./src/user${path}`, code);
    }));
});
server.listen(PORT, () => {
    console.log(`Server listening at PORT - ${PORT}`);
});
