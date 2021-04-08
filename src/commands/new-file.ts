import * as mkdirp from "mkdirp";
import { lstatSync } from "node:fs";
import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";

export const newFile = async (uri: Uri) => {
    const fileName = await promptForFileName();
    if (!fileName) {
        window.showErrorMessage("Error: file name is missing");
        return;
    }

    let directory;
    const hasDirectory = uri?.fsPath || lstatSync(uri?.path).isDirectory();
    //TODO IMPROVE BAD CODE
    if (!hasDirectory) {
        directory = await promptForTargetDirectory();
        if (!directory) {
            window.showErrorMessage("Error: select a valid directory");
            return;
        }
    } else {
        directory = uri.fsPath;
    }

    //TODO GENERATE FILE
};

//returns a promise
function promptForFileName(): Thenable<string | undefined> {
    const alertOptions: InputBoxOptions = {
        prompt: "File Name",
        placeHolder: "my-file"
    };
    return window.showInputBox(alertOptions);
}

async function promptForTargetDirectory() {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        canSelectFolders: true,
        openLabel: "Select a folder to place file"
    };

    const uri = await window.showOpenDialog(options);

    if (!!uri) {
        return uri[0].path;
    }
    return null;
}

//TODO GENERATE CODE

