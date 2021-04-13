import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { assignDirectoryFromExplorer, promptForFileName } from "../functions/folder-related";
import { generateFileCode } from "../functions/code-creation-related";
import { showCatchedErrorMessage } from "../functions/utils";

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

    if (!directory) {
        window.showErrorMessage("Error: select a valid directory");
        return;
    }

    try {
        await generateFileCode({ fileName, directory });
        window.showInformationMessage(`Successfully generated ${fileName} code!`);
    } catch (error) {
        showCatchedErrorMessage(error);
        throw error;
    }
};










