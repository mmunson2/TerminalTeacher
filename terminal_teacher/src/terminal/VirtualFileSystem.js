import Directory from "./Directory";
import File from "./File"
import { ProcessResult, ResultCodes } from "./ProcessResult";
import ProcessInput from "./ProcessInput";

class VirtualFileSystem {

    constructor(startingDirectory) {
        
        if(startingDirectory) {
            this.fileSystem = startingDirectory;
        }
        else {
            this.fileSystem = new Directory("/", []);
        }

        this.currentDirectory = this.fileSystem;

        this.createDemoFileSystem();
    }

    createDemoFileSystem() {
        const codeFile1 = new File("demo", "py", `
        if __name__ == "__main__":
            print("Hello!")
        `);
        const codeFile2 = new File("main", "java", `
        public static void main(string[] args)
        {
            System.out.println("Hi there");
        }
        `)
        const groceryList = new File("groceries", "txt", `
        - bananas
        - bananas
        - bananas`);

        const projectFolder = new Directory("final_project", [codeFile1]);
        const devFolder = new Directory("dev", [projectFolder, codeFile2]);
        const usrFolder = new Directory("usr", [groceryList]);
        const etcFolder = new Directory("etc", [])

        this.currentDirectory.addDirectory(devFolder);
        this.currentDirectory.addDirectory(usrFolder);
        this.currentDirectory.addDirectory(etcFolder);
    }

    parseCommand(nextLine) {
        const input = new ProcessInput(nextLine);

        if(input.command === "") {
            return new ProcessResult(input, ResultCodes.SUCCESS, "");
        }
        else if(input.command === "mkdir") {
            return this.mkdir(input);
        }
        else if(input.command === "ls") {
            return this.ls(input);
        }
        else if(input.command === "touch") {
            return this.touch(input);
        }
        else if(input.command === "cd") {
            return this.cd(input);
        }
        else if(input.command === "cat") {
            return this.cat(input);
        }
        else {
            return new ProcessResult(input, ResultCodes.NOT_FOUND, `command not found: ${input.command}`);
        }
    }

    mkdir(input) {
        
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: mkdir directory_name";

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        const dirName = input.arguments[0];

        const newDir = new Directory(dirName, []);

        try {
            this.currentDirectory.addDirectory(newDir);

            return new ProcessResult(input, ResultCodes.SUCCESS, "");
        }
        catch(e) {
            return new ProcessResult(input, ResultCodes.ERROR, e.message)
        }
    }

    ls(input) {

        let showSize = false;
        let details = ""

        if(input.arguments && input.arguments[0] === "-l") {
            showSize = true;
        }
        else if (input.arguments && input.arguments.length > 0) {
            details = `ls: invalid option ${input.arguments[0]}`;

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        try {
            if(showSize) {
                details = this.currentDirectory.listContentsWithSize()
            }
            else {
                details = this.currentDirectory.listContents()
            }

            return new ProcessResult(input, ResultCodes.SUCCESS, details);
        }
        catch(e) {
            return new ProcessResult(input, ResultCodes.ERROR, e.message)
        }
    }

    touch(input) {

        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: touch file_name";

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        const filename = input.arguments[0];

        if(typeof(filename) === "string" && filename.split(".").length === 2) {
            let fileComponents = filename.split(".");

            try {
                this.currentDirectory.addFile(new File(fileComponents[0], fileComponents[1], ""));

                return new ProcessResult(input, ResultCodes.SUCCESS, "")
            }
            catch(e) {
                return new ProcessResult(input, ResultCodes.ERROR, e.message);
            }
        }
        else {
            const details =  `touch: invalid filename ${filename}`

            return new ProcessResult(input, ResultCodes.ERROR, details)
        }
    }

    cd(input) {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: cd directory_path";

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        const path = input.arguments[0];

        if(path === "/") {
            this.currentDirectory = this.fileSystem;

            return new ProcessResult(input, ResultCodes.SUCCESS, "")
        }

        if(path.includes("/")) {
            const separatedPath = path.split("/");
            
            if(separatedPath[0] === "") {
                // Get rid of empty first element
                separatedPath.shift()
            }

            let searchDirectory;

            // Starting a path with / searches for absolute paths
            if(path[0] === "/") {
                searchDirectory = this.fileSystem;
            }
            else { // else search relative
                searchDirectory = this.currentDirectory
            }
            
            for(let i = 0; i < separatedPath.length; i++) {
                const nextDir = searchDirectory.getDirectory(separatedPath[i])

                if(!nextDir) {
                    const details = `${path}: Not a directory`

                    return new ProcessResult(input, ResultCodes.ERROR, details)
                }
                else if(i === separatedPath.length - 1) {
                    this.currentDirectory = nextDir;

                    return new ProcessResult(input, ResultCodes.SUCCESS, "")
                }
                else { // Loop again, searching the current directory
                    searchDirectory = nextDir;
                }
            }
        }
        else { // TODO: Simplify
            let searchDirectory = this.currentDirectory;

            const nextDir = searchDirectory.getDirectory(path);

            if(!nextDir.isDirectory) {
                const details = `${path}: Not a directory`

                return new ProcessResult(input, ResultCodes.ERROR, details)
            }
            else {
                this.currentDirectory = nextDir;

                return new ProcessResult(input, ResultCodes.SUCCESS, "")
            }
        }
    }

    cat(input) {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: cat file_name";

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        const fileName = input.arguments[0];

        if(this.currentDirectory.getDirectory(fileName)) {
            const details = `cat: ${fileName} is a directory`

            return new ProcessResult(input, ResultCodes.ERROR, details);
        }

        try {
            const file = this.currentDirectory.getFile(fileName);

            if(file) {
                return new ProcessResult(input, ResultCodes.SUCCESS, file.contents)
            }
            else {
                const details = `cat: ${fileName}: no such file or directory`
    
                return new ProcessResult(input, ResultCodes.ERROR, details);
            }
        }
        catch(e) {
            return new ProcessResult(input, ResultCodes.ERROR, e.message);
        }
    }

    

}

export default VirtualFileSystem;