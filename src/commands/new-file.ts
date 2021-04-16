import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { assignDirectoryFromExplorer, promptForFileName } from "../functions/prompt-related";
import { generateFileCode } from "../functions/code-creation-related";
import { showCatchedErrorMessage } from "../functions/utils";
import { CodeGenerator, FeatureTreeMaker } from "../classes/feature-tree-maker";

export const newFile = async (uri: Uri) => {
    try {
        const fileName = await promptForFileName();

        let directory: string;
        let hasDirectory;
        if (!!uri) {
            hasDirectory = !!uri?.fsPath || lstatSync(uri?.path).isDirectory();
        }

        !!hasDirectory ? directory = uri.fsPath :
            directory = await assignDirectoryFromExplorer();

        const treeMaker: CodeGenerator = new FeatureTreeMaker({ fileName: fileName, directory: directory });
        await treeMaker.generateStrucureCode();

        window.showInformationMessage(`Code generated uccessfully!`);
    } catch (error) {
        showCatchedErrorMessage(error);
        throw error;
    }
};










