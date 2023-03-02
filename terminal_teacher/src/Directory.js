import FileDescriptor from "./FileDescriptor";

class Directory extends FileDescriptor {

    constructor(name, contents) {
        super(name, contents, true)
    }

     /**
     * @param {list} newContents
     * 
     * Must be a list of FileDescriptor objects (File or Directory)
     */
     set contents(newContents) {
        if(typeof(newContents) != "object") {
            throw new TypeError("Contents of a directory must be a list");
        }

        this._contents = newContents;
    }

    get contents() {
        return this._contents;
    }

    addDirectory(directory) {
        if(this.getDirectory(directory.name)) {
            throw new Error(`Directory: ${directory.name} already exists in ${this.name}`)
        }

        this.contents.push(directory)
    }

    listContents() {
        let contents = "";

        for(let fd of this.contents) {
            if(fd.isDirectory) {
                contents += fd.name;
                contents += "\n";
            }
            else {
                contents += fd.name;
                contents += ".";
                contents += fd.extension;
                contents += "\n";
            }
        }

        return contents;
    }

    listContentsWithSize() {
        let contents = "";

        for (let fd of this.contents) {
            if(fd.isDirectory) {
                contents += fd.name;
                contents += " "
                contents += fd.getSize();
                contents += "\n";
            }
            else {
                contents += fd.name;
                contents += ".";
                contents += fd.extension;
                contents += " ";
                contents += fd.getSize();
                contents += "\n"
            }
        }

        return contents;
    }

    getFile(filename) {
        let splitFile = filename.split(".");

        if(splitFile.length !== 2) {
            throw new Error("filename should have a name and extension separated by a period");
        }

        for(let fd of this.contents) {
            if(!fd.isDirectory && fd.name === filename) {
                return fd;
            }
        }

        return false;
    }

    getDirectory(dirName) {
        for(let fd of this.contents) {
            if(fd.isDirectory && fd.name === dirName) {
                return fd;
            }
        }

        return false;
    }

    getSize() {
        let size = 0;

        for(let fd of this.contents) {
            size += fd.getSize();
        }

        return size;
    }
}

export default Directory;