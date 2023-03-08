const ResultCodes = {
    SUCCESS: "Process completed successfully",
    ERROR: "Process encountered an error",
    NOT_FOUND: "Process could not be found"
}

class ProcessResult {

    constructor(processInput, resultCode, details) {
        
        this.processInput = processInput;
        this.resultCode = resultCode;
        this.details = details ? details : "";
    }

    get processInput(){
        return this._processInput;
    }

    set processInput(newInput) {
        if(typeof(newInput) !== "object") {
            throw new TypeError("ProcessResult processInput should be an object");
        }

        this._processInput = newInput;
    }

    get resultCode() {
        return this._resultCode;
    }

    set resultCode(newCode) {
        if(typeof(newCode) !== "string") {
            throw new TypeError("ProcessResult resultCode should be a string")
        }

        this._resultCode = newCode;
    }

    get details() {
        return this._details;
    }

    set details(newDetails) {
        if(typeof(newDetails) !== "string") {
            throw new TypeError("ProcessResult details should be a string");
        }

        this._details = newDetails;
    }
}

export {ProcessResult, ResultCodes}