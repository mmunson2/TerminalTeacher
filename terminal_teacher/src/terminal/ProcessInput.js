class ProcessInput {
    constructor(line) {
        const commandComponents = line.trim().split(" ");

        if(commandComponents.length < 1 || line === "") {
            this.command = ""
            this.arguments = []
        }
        else {
            this.command = commandComponents[0];
            this.arguments = commandComponents.splice(1)
        }
    }

    get command() {
        return this._command;
    }

    set command(newCommand) {
        if(typeof(newCommand) !== "string") {
            throw new TypeError("ProcessInput command should be a string")
        }

        this._command = newCommand;
    }

    set arguments(newArguments) {
        if(typeof(newArguments) !== "object") {
            throw new TypeError("ProcessInput arguments should a list")
        }

        this._arguments = newArguments;
    }

    get arguments() {
        return this._arguments;
    }
}

export default ProcessInput;