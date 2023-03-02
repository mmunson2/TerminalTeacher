import './App.css';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {

  const [currentState, setState] = React.useState(
    {terminalContents: "", 
    commandList: [], 
    selectedCommand: 0
  });

  const handleTerminalInput = (event) => {

    const key = event.key;

    // Enter behavior: Submit command, update terminal object, update command list
    if(key === "Enter") {
      event.preventDefault();
      
      const command = event.target.value;

      let terminalContents = currentState.terminalContents;
      terminalContents += "\n";
      terminalContents += command;

      const commandList = currentState.commandList;
      commandList.push(command);

      setState(
        {terminalContents: terminalContents, 
          commandList: commandList,
          selectedCommand: commandList.length
        })

      event.target.value = "";
    }
    // Arrow keys get previous/next commands in list
    else if(key === "ArrowUp" || key === "ArrowDown") {
      const commandList = currentState.commandList;

      let newCommandIndex;

      if(key === "ArrowUp") {
        newCommandIndex = currentState.selectedCommand - 1
      }
      else {
        newCommandIndex = currentState.selectedCommand + 1
      }

      if(newCommandIndex >= 0 && newCommandIndex < commandList.length) {
        event.target.value = commandList[newCommandIndex];
        
        const newState = currentState;
        newState.selectedCommand = newCommandIndex;

        setState(newState);
      }
    }
  }

  return <Box
    component="form"
    sx={{
      width: 300,
      height: 400,
      backgroundColor: 'gray',
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="terminal-output"
        multiline
        maxRows={10}
        defaultValue={currentState.terminalContents}
      />
      <TextField 
      id="terminal-input" 
      variant="filled"
      onKeyDown={handleTerminalInput} />
    </div>
  </Box>
}

export default App;
