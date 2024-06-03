import { useEffect, useRef } from 'react';
import { XTerminal } from '../../lib/xterm';
import styles from './Terminal.module.css';
import socket from '../../lib/socket';

const Terminal = () => {
  let terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!terminalRef) return;
    XTerminal.onData((data) => {
      socket.emit('terminal:write', data);
    });
    socket.on('terminal:data', (data) => {
      console.log('DATA : ', data);
      XTerminal.write(data);
    });
    XTerminal.open(terminalRef.current as HTMLElement);
  }, [terminalRef]);

  return <div id={styles.terminal} ref={terminalRef}></div>;
};

export default Terminal;
