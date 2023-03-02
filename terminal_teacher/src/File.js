import FileDescriptor from "./FileDescriptor";

class File extends FileDescriptor {
    constructor(name, extension, contents) {
        super(name, contents, false);

        this.extension = extension;
    }

    get extension() {
        return this._extension;
    }

    /**
     * @param {string} newContents
     * 
     * Must be a string consisting of only lowercase letters
     */
    set extension(newExtension) {
        if(typeof(newExtension) != "string") {
            throw new TypeError("Extension must be a string");
        }
        
        // File extensions may only be lowercase letters
        const allowedExtensionChars = /[a-z]/

        if(!allowedExtensionChars.test(newExtension)) {
            throw new TypeError("Extension contains invalid characters")
        }

        this._extension = newExtension;
    }

    /**
     * @param {string} newContents
     */
    set contents(newContents) {
        if(typeof(newContents) != "string") {
            throw new TypeError("Contents of a file must be a string");
        }

        this._contents = newContents;
    }

    getSize() {
        return this.contents.length;
    }
}

export default File;