import { Uri, window } from "vscode";
import { promptForFileName, showCatchedErrorMessage } from "../utils/utils";
import { CleanArchitectureCodeGenerator } from "../features/code-generation/tree-creator-layer/clean-architecture-code-generator";

export interface NewFileDispatcher {
    newFile(uri: Uri): void;
}

export class CommandsHandler implements NewFileDispatcher {
    constructor(private cleanArchitectureCodeGenerator: CleanArchitectureCodeGenerator) { }

    //in this way it will not loose this reference (arrow function doesn't have this)
    newFile = async (uri: Uri) => {
        try {
            const fileName = await promptForFileName();

            const directory: string = uri.fsPath;
            await this.cleanArchitectureCodeGenerator.generateStrucureCode({ directory: directory, fileName: fileName });

            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    };
}









