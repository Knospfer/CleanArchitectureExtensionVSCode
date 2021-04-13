import * as mkdirp from "mkdirp";
import { existsSync, lstatSync, writeFile } from "fs";
import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";

export const newFile = async (uri: Uri) => {
    const fileName = await promptForFileName();
    if (!fileName) {
        window.showErrorMessage("Error: file name is missing");
        return;
    }

    let directory;
    let hasDirectory;
    if (!!uri) {
        hasDirectory = !!uri?.fsPath || lstatSync(uri?.path).isDirectory();
    }
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

    try {
        await generateFileCode({ fileName, directory });
        window.showInformationMessage(`Successfully generated ${fileName} code!`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        window.showErrorMessage(errorMessage);
    }
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

function getFileTemplate(filename: string) {

    return `
        class ${filename.toUpperCase()} {
            hi(){
                console.log("hi! i'm your file!");
            }
        }
    `;
}

async function generateFileCode(args: { fileName: string, directory: string }) {
    const { fileName, directory } = args;
    const directoryPath = `${directory}/${fileName}`;

    if (!existsSync(directoryPath)) {
        await createDirectory(directoryPath);
    }

    await createFileTemplate({ filename: fileName, directory: directoryPath });
}

async function createDirectory(directory: string): Promise<void> {
    try {
        await mkdirp(directory);
    } catch (error) {
        throw error;
    }
}

async function createFileTemplate(args: { filename: string, directory: string }): Promise<void> {
    const { filename, directory } = args;

    const finalPath = `${directory}/${filename}.ts`;

    if (existsSync(finalPath)) {
        throw Error(`${directory}/${filename}.ts alread exists!`);
    }

    const code = await getFileTemplate(filename);

    return new Promise((resolve, reject) => {
        writeFile(finalPath, code, (error) => {
            if (!!error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}