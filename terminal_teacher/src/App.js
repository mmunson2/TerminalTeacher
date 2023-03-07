import './App.css';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VirtualFileSystem from "./VirtualFileSystem.js";
import Instructor from "./Instructor.js"
import ProcessResult from './ProcessResult';

function parseCommand(nextLine, fileSystem, instructor) {
  const commandComponents = nextLine.split(" ");

  if(commandComponents.length < 1) {
    return "";
  }

  const command = commandComponents[0];

  if(command === "mkdir") {
    if(commandComponents.length < 2) {
      instructor.parseCommand(command, new ProcessResult())
      return "usage: mkdir directory_name"
    }
    else {
      const result = fileSystem.mkdir(commandComponents[1]);

      instructor.parseCommand(command, result);
      return result.details;
    }
  }
  else if(command === "ls") {
    if(commandComponents.length > 1) {
      const result = fileSystem.ls(commandComponents[1]);

      instructor.parseCommand(command, result);

      return result.details;
    }
    else {
      const result = fileSystem.ls()

      instructor.parseCommand(command, result);

      return result.details;
    }
  }
  else if(command === "touch") {
    if(commandComponents.length < 2) {
      instructor.parseCommand(command, new ProcessResult())
      return "usage: touch file_name"
    }
    else {
      const result = fileSystem.touch(commandComponents[1]);

      instructor.parseCommand(command, result);

      return result.details;
    }
  }
  else if(command === "cd") {
    if(commandComponents.length < 2) {
      instructor.parseCommand(command, new ProcessResult())
      return "usage: cd directory_path"
    }
    else {
      const result = fileSystem.cd(commandComponents[1]);

      instructor.parseCommand(command, result);

      return result.details;
    }
  }
  else {
    instructor.parseCommand(command, new ProcessResult());

    return `command not found: ${command}`;
  }

}


function App() {

  const [currentState, setState] = React.useState(
    {terminalContents: "", 
    commandList: [], 
    selectedCommand: 0,
    fileSystem: new VirtualFileSystem(),
    instructor: new Instructor()
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

      const output = parseCommand(command, currentState.fileSystem, currentState.instructor);

      if(output) {
        terminalContents += "\n"
      }
      terminalContents += output;

      console.log(currentState.fileSystem)

      setState(
        {terminalContents: terminalContents, 
          commandList: commandList,
          selectedCommand: commandList.length,
          fileSystem: currentState.fileSystem,
          instructor: currentState.instructor
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

  const instructorStyle = {
    width: 100,
    height: 100
  }

  console.log(instructorStyle.background)

  return <>
  <h1>Terminal Teacher</h1>
  <p>A place to practice the Unix terminal from the web</p>
  <div style={instructorStyle}></div>
  <img style={instructorStyle} src={currentState.instructor.pose} alt="Bonzi buddy"></img>
  <p>Instructor says: {currentState.instructor.suggestion}</p>
  <Box
    component="form"
    sx={{
      width: 1080,
      height: 800,
      backgroundColor: 'gray',
      backgroundImage: 'terminal_teacher/src/Assets/code_background.jpg',
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
        className="terminal-output"
      />
      <TextField 
      id="terminal-input" 
      variant="filled"
      onKeyDown={handleTerminalInput}
      className="terminal-input" />
      
    </div>
  </Box></>
}

export default App;
