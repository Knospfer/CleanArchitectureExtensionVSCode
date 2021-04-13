import mkdirp = require("mkdirp");
import { InputBoxOptions, OpenDialogOptions, window } from "vscode";
import { showCatchedErrorMessage } from "./utils";

export function promptForFileName(): Thenable<string | undefined> {
    const alertOptions: InputBoxOptions = {
        prompt: "File Name",
        placeHolder: "my-file"
    };
    return window.showInputBox(alertOptions);
}

export async function assignDirectoryFromExplorer() {
    let directory = await promptForTargetDirectory();
    if (!directory) {
        window.showErrorMessage("Error: select a valid directory");
        return "";
    }
    return directory;
}

export async function promptForTargetDirectory(): Promise<string> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        canSelectFolders: true,
        openLabel: "Select a folder to place file"
    };

    const uri = await window.showOpenDialog(options);

    if (!!uri) {
        return uri[0].path;
    }
    return "";
}

export async function createDirectory(directory: string): Promise<void> {
    try {
        await mkdirp(directory);
    } catch (error) {
        showCatchedErrorMessage(error);
    }
}