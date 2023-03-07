class FileDescriptor {

    constructor(name, contents, isDirectory) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.contents = contents;
    }

    get name() {
        return this._name;
    }

    get extension() {
        return this._extension;
    }

    get contents() {
        return this._contents;
    }

    get isDirectory() {
        return this._isDirectory;
    }

    set name(newName) {
        if(typeof(newName) != "string") {
            throw new TypeError("Filename must be a string");
        }

        this._name = newName;
    }

    set contents(newContents) {
        if(this.isDirectory && typeof(newContents) != "object") {
            throw new TypeError("Contents of a directory must be a list");
        }

        this._contents = newContents;
    }

    set isDirectory(newIsDirectory) {
        if(typeof(newIsDirectory) != "boolean") {
            throw new TypeError("isDirectory must be a boolean");
        }

        this._isDirectory = newIsDirectory;
    }

    getSize() {
        console.warn("FileDescriptor getSize() is being called directly - this may return an array length rather than sum")

        return this.contents.length;
    }
}

export default FileDescriptor;