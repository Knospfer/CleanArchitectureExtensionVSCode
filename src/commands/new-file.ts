import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { assignDirectoryFromExplorer, promptForFileName } from "../functions/folder-related";
import { generateFileCode } from "../functions/code-creation-related";

export const newFile = async (uri: Uri) => {
    const fileName = await promptForFileName();
    if (!fileName) {
        window.showErrorMessage("Error: file name is missing");
        return;
    }

    let directory: string;
    let hasDirectory;
    if (!!uri) {
        hasDirectory = !!uri?.fsPath || lstatSync(uri?.path).isDirectory();
    }

    !!hasDirectory ? directory = uri.fsPath :
        directory = await assignDirectoryFromExplorer();

    if (!directory) { return; }

    try {
        await generateFileCode({ fileName, directory });
        window.showInformationMessage(`Successfully generated ${fileName} code!`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        window.showErrorMessage(errorMessage);
    }
};










