import './App.css';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {

  const [currentState, setState] = React.useState({terminalContents: ""});

  const handleTerminalInput = (event) => {

    const key = event.key;

    if(key === "Enter") {
      event.preventDefault();
      
      const command = event.target.value;

      let terminalContents = currentState.terminalContents
      terminalContents += "\n";
      terminalContents += command;

      setState({terminalContents: terminalContents})

      event.target.value = "";
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
