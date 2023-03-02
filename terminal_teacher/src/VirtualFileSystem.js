import Directory from "./Directory";
import File from "./File"

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

        this.currentDirectory.addDirectory(newDir);
    }
}

export default VirtualFileSystem;