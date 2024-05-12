import { useEffect, useState } from 'react';
import Terminal, {
  ColorMode,
  TerminalOutput,
  TerminalInput,
} from 'react-terminal-ui';
import socket from '../../lib/socket';
const Term = () => {
  const [terminalLineData, setTerminalLineData] = useState<any[]>([
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>,
  ]);

  // XTerminal.onData((data) => {
  //   socket.emit('terminal:write', data);
  // });
  useEffect(() => {
    socket.on('terminal:data', (data) => {
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalOutput>{data}</TerminalOutput>,
      ]);
    });
  }, []);
  const handleInput = (data: string) => {
    if (data) {
      socket.emit('terminal:write', data);
      setTerminalLineData((prev) => [
        ...prev,
        <TerminalInput>{data}</TerminalInput>,
      ]);
    }
  };
  return (
    <div className="container">
      <Terminal
        name="React Terminal Usage Example"
        colorMode={ColorMode.Light}
        onInput={handleInput}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default Term;
