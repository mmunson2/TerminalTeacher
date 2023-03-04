class ProcessResult {

    constructor(success, details) {
        this.success = success;
        this.details = details;
    }

    get success() {
        return this._success;
    }

    get details() {
        return this._details;
    }

    set success(newStatus) {
        if(typeof(newStatus) !== "boolean") {
            throw new TypeError("Success value must be a boolean");
        }

        this._success = newStatus;
    }

    set details(newDetails) {
        if(typeof(newDetails) !== "string") {
            throw new TypeError("Process details must be a string")
        }

        this._details = newDetails;
    }
}

export default ProcessResult