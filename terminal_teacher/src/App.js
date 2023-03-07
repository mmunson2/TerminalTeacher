import './App.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import VirtualFileSystem from "./terminal/VirtualFileSystem.js";
import Instructor from "./instructor/Instructor.js"
import parseCommand from './terminal/CommandParser';
import title from './assets/title_cropped.jpg';
import textWindowImage from "./assets/text_box.png";

const username = "bonzi$ "
const terminalLineCount = 10

function trimTerminalContents(terminalContents) {
  let lineCount = (terminalContents.match(/\n/g) || []).length;

  while(lineCount > terminalLineCount) {
    terminalContents = terminalContents.slice(terminalContents.indexOf("\n") + 1, terminalContents.length)

    lineCount = (terminalContents.match(/\n/g) || []).length;
  }

  return terminalContents;
}

function updateTerminalContents(currentState, command) {

  // Add the command executed by the user to the terminal
  let terminalContents = currentState.terminalContents;
  terminalContents += "\n";
  terminalContents += command;

  // Get the string output from the command parser
  const output = parseCommand(command, currentState.fileSystem, currentState.instructor, username);

  // If there's output, add it to the terminal
  if(output) {
    terminalContents += "\n"
  }
  terminalContents += output;

  // Check if we've exceeded our terminal line limit. Trim if so
  terminalContents = trimTerminalContents(terminalContents);

  currentState.terminalContents = terminalContents;

  return currentState;
}

function updateCommandList(currentState, command) {
  const commandList = currentState.commandList;
  commandList.push(command);

  currentState.commandList = commandList;
  currentState.selectedCommand = commandList.length;

  return currentState;
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
      let newState = currentState;

      newState = updateTerminalContents(newState, command);
      newState = updateCommandList(newState, command);

      setState({
        terminalContents: newState.terminalContents, 
        commandList: newState.commandList, 
        selectedCommand: newState.selectedCommand,
        fileSystem: newState.fileSystem,
        instructor: newState.instructor
      });

      event.target.value = username;
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
    // Don't allow the user to delete the user display
    else if (key === "Backspace") {
      if(event.target.value.length <= username.length) {
        event.preventDefault()
        event.target.value = username;
      }
    }
  }

  return <>
  <img id="title-img" src={title} alt="Terminal Teacher"></img>
  <div className="about-text">
  <h1>About</h1>
  <p>Terminal Teacher is a Unix-like environment that runs in a web browser. While an operating system can sometimes be sparse and cold in its error messages, Terminal Teacher provides a cheerful mascot to provide additional details.</p>
  <h3>Some commands to try are</h3>
  <ul>
    <li>mkdir</li>
    <li>touch</li>
    <li>ls</li>
    <li>cd</li>
  </ul>
  </div>

  <div id="instructor">
  <img src={textWindowImage} alt="window" className="instructor-window"></img>
  <img className="instructor-image" src={currentState.instructor.pose} alt="Bonzi buddy"></img>
  <span className="instructor-hint-box">Bonzi says: {currentState.instructor.suggestion}</span>
  </div>
  <div id="terminal">
    <TextField
      id="terminal-output"
      className="terminal-out"
      multiline
      fullWidth
      maxRows={15}
      defaultValue={currentState.terminalContents}
      onKeyDown={(event) => {event.preventDefault();}}
    />
    <TextField 
    id="terminal-input"
    className="terminal-in"
    variant="filled"
    defaultValue={username}
    onKeyDown={handleTerminalInput}
    />
  </div></>
}

export default App;
