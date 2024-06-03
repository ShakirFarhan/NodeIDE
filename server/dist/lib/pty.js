import * as pty from 'node-pty';
import os from 'os';
console.log(os.platform());
const shell = process.env[os.platform() === 'win32' ? 'bash.exe' : 'bash'];
export const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD + '/user',
    env: process.env,
});
