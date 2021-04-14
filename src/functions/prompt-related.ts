import { InputBoxOptions, OpenDialogOptions, window } from "vscode";

export async function promptForFileName(): Promise<string> {
    const alertOptions: InputBoxOptions = {
        prompt: "File Name",
        placeHolder: "my-file"
    };
    const fileName = await window.showInputBox(alertOptions);
    if(!!fileName){
        return fileName;
    }
    throw new Error("Error: file name is missing");
}

export async function assignDirectoryFromExplorer() {
    let directory = await promptForTargetDirectory();
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
    throw new Error("Error: select a valid directory");
}