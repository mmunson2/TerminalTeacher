# Build Instructions

Matthew Munson
2023-03-08

## Dependencies
- Node.JS and NPM
- React
- Material UI

To install node on your system, see: https://nodejs.org/en/

To install React on your system, see: https://reactjs.org/docs/getting-started.html 

To install material UI with npm run:   
`npm install @mui/material @emotion/react @emotion/styled`   
or see: https://mui.com/material-ui/getting-started/installation/   

## Running the project

1. Navigate to the terminal_teacher directory
2. Open Chrome or your web browser of choice
3. Start react with `npm start`
4. A browser tab should open with the project

## Scenarios to Test:

1. Enter an invalid command:
    - Scroll to the bottom of the page
    - Enter an invalid command such as `mkdir` or `touch` into the terminal (these normally require a filename)
    - Note that Bonzi gives you information about the command and a helpful suggestion
2. Enter the `help` command:
    - Scroll to the bottom of the page
    - Enter `help` into the terminal
    - Note that the commands are listed in the terminal and Bonzi suggests what to do next
3. Enter the `ls` command:
    - Scroll to the bottom of the page
    - Enter `ls` into the terminal
    - Note that the contents of the root folder are displayed and Bonzi suggests what to do next
4. Enter the `cd` command
    - Scroll to the bottom of the page
    - Enter `cd dev` into the terminal
    - Note that Bonzi gives you a suggestion
    - Enter `ls` into the terminal
    - Note that the directory contents are different
