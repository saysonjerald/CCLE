import React, { useState } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';

const TerminalUI = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    {
      type: LineType.Output,
      value: '\t',
    },
  ]);
  return (
    <Rnd
      style={{ zIndex: 999 }}
      default={{
        x: 550,
        y: 200,
      }}
      dragHandleClassName="react-terminal-wrapper"
      resizeHandleClasses="react-terminal-wrapper"
    >
      <Terminal
        name="Terminal Output"
        colorMode={ColorMode.Dark}
        lineData={terminalLineData}
        onInput={(terminalInput) =>
          console.log(`New terminal input received: '${terminalInput}'`)
        }
      />
    </Rnd>
  );
};

export default TerminalUI;
