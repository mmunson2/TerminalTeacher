import standard from "./Assets/Default_Transparent.png"
import approving from "./Assets/Looking_Good_Transparent.png"
import explaining from "./Assets/Info_Transparent.png"
import apologizing from "./Assets/Sorry_Transparent.png"

const instructorPoses = {
    standard: standard,
    approving: approving,
    explaining: explaining,
    apologizing: apologizing
}

class Instructor {

    constructor() {
        this.suggestion = "Try making a file with \"touch newFile.txt\""
        this.pose = instructorPoses.standard;
    }

    get suggestion() {
        return this._suggestion;
    }

    set suggestion(newSuggestion) {
        if(typeof(newSuggestion) !== "string") {
            throw new TypeError("Suggestion should be of type string")
        }
        
        this._suggestion = newSuggestion;
    }

    get pose() {
        return this._pose;
    }

    set pose(pose) {
        this._pose = pose;
    }

    parseCommand(command, result) {
        if(result.success) {
            this.suggestion = "Looking good!"
            this.pose = instructorPoses.approving;
        }
        else if(command === "mkdir") {
            this.suggestion = "The mkdir command is used to create a directory. You can name a directory anything you'd like! Try \"mkdir my_directory\""
            this.pose = instructorPoses.explaining;
        }
        else if(command === "ls") {
            this.suggestion = "The ls command lists the contents of the current directory. It doesn't need any arguments, but try adding \"-l\" to view file and directory sizes!"
            this.pose = instructorPoses.explaining;
        }
        else if(command === "touch") {
            this.suggestion = "The touch command creates a blank file. You can name a file anything you'd like, but this terminal requires an extension to be added like \".txt\". Try \"touch my_file\""
            this.pose = instructorPoses.explaining;
        }
        else if(command === "cd") {
            this.suggestion = "The cd command changes the current directory. You might need to create a directory with mkdir first! Enter the name of the directory you want to change to as an argument like \"cd my_directory\". To go back to the root directory, use \"cd /\""
            this.pose = instructorPoses.explaining;
        }
        else {
            this.suggestion = "Not all Unix commands are implemented, sorry :)"
            this.pose = instructorPoses.apologizing;
        }
    }

}

export default Instructor;