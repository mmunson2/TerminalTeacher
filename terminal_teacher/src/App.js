import './App.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import VirtualFileSystem from "./terminal/VirtualFileSystem.js";
import Instructor from "./instructor/Instructor.js"
import ProcessResult from './terminal/ProcessResult';
import title from './assets/title_cropped.jpg';
import textWindowImage from "./assets/text_box.png";

const username = "bonzi$ "
const terminalLineCount = 10

function parseCommand(nextLine, fileSystem, instructor) {
  // Remove the username from the input line
  nextLine = nextLine.slice(username.length, nextLine.length)

  // Trim whitespace, then split by single whitespace
  const commandComponents = nextLine.trim().split(" ");

  if(commandComponents.length < 1 || nextLine === "") {
    instructor.parseCommand("", new ProcessResult())
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

function trimTerminalContents(terminalContents) {
  let lineCount = (terminalContents.match(/\n/g) || []).length;

  while(lineCount > terminalLineCount) {
    terminalContents = terminalContents.slice(terminalContents.indexOf("\n") + 1, terminalContents.length)

    lineCount = (terminalContents.match(/\n/g) || []).length;
  }

  return terminalContents;
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


      terminalContents = trimTerminalContents(terminalContents);

      setState(
        {terminalContents: terminalContents, 
          commandList: commandList,
          selectedCommand: commandList.length,
          fileSystem: currentState.fileSystem,
          instructor: currentState.instructor
        })

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
