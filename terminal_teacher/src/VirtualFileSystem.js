import Directory from "./Directory";
import File from "./File"
import ProcessResult from "./ProcessResult";

class VirtualFileSystem {

    constructor(startingDirectory) {
        
        if(startingDirectory) {
            this.fileSystem = startingDirectory;
        }
        else {
            this.fileSystem = new Directory("/", []);
        }

        this.currentDirectory = this.fileSystem;
    }

    mkdir(dirName) {
        const newDir = new Directory(dirName, []);

        const result = new ProcessResult()

        try {
            this.currentDirectory.addDirectory(newDir);

            result.success = true;

            return result;
        }
        catch(e) {

            result.success = false;
            result.details = e.message;

            return result;
        }
    }

    ls(args) {
        const result = new ProcessResult();
        let showSize = false;

        if(args && typeof(args) === "string" && args === "-l") {
            showSize = true;
        }
        else {
            result.success = false;
            result.details `ls: invalid option ${args}`

            return result;
        }

        try {
            if(showSize) {
                result.details = this.currentDirectory.listContentsWithSize()
            }
            else {
                result.details = this.currentDirectory.listContents()
            }
            
            result.success = true;

            return result;
        }
        catch(e) {
            result.details = e.message;
            result.success = false;

            return result;
        }
    }

    touch(filename) {
        const result = new ProcessResult();

        if(typeof(filename) === "string" && filename.split(".").length === 2) {
            let fileComponents = filename.split(".");

            try {
                this.currentDirectory.addFile(new File(fileComponents[0], fileComponents[1], ""));

                result.success = true;
                return result;
            }
            catch(e) {
                result.details = e.message;
                result.success = false;

                return result;
            }
        }
        else {
            result.success = false;
            result.details `touch: invalid filename ${filename}`

            return result;
        }
    }

    cd(path) {
        const result = new ProcessResult();

        if(typeof(path) === "string") {
            if(path.contains("/")) {
                const separatedPath = path.split("/");

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

                    if(!nextDir.isDirectory) {
                        result.success = false;
                        result.details = `${path}: Not a directory`

                        return result;
                    }
                    else if(i === separatedPath.length - 1) {
                        this.currentDirectory = nextDir;

                        result.success = true;

                        return result;
                    }
                    else { // Loop again, searching the current directory
                        searchDirectory = nextDir;
                    }
                }
            }
            else { // TODO: Simplify
                const nextDir = searchDirectory.getDirectory(path);

                if(!nextDir.isDirectory) {
                    result.success = false;
                    result.details = `${path}: Not a directory`

                    return result;
                }
                else {
                    this.currentDirectory = nextDir;

                        result.success = true;

                        return result;
                }
            }
        }
        else {
            result.success = false;
            result.details = `cd: invalid path ${path}`

            return result;
        }
    }

}

export default VirtualFileSystem;