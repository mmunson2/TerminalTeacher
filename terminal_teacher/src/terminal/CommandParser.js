import ProcessResult from './ProcessResult';


function parseCommand(nextLine, fileSystem, instructor, username) {
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

  export default parseCommand;