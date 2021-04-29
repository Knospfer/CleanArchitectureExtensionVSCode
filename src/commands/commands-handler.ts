import { Uri, window } from "vscode";
import { promptForFileName, showCatchedErrorMessage } from "../utils/utils";
import { CleanArchitectureCodeGenerator } from "../features/code-generation/tree-creator-layer/clean-architecture-code-generator";

export interface NewFileDispatcher {
    newFeature(uri: Uri): void;
}

export class CommandsHandler implements NewFileDispatcher {
    constructor(private cleanArchitectureCodeGenerator: CleanArchitectureCodeGenerator) { }

    //in this way it will not loose this reference (arrow function doesn't have this)
    newFeature = async (uri: Uri) =>
        await this.handleMethodCalling(uri, this.cleanArchitectureCodeGenerator.generateNewFeature);

    expandFeature = async (uri: Uri) =>
        await this.handleMethodCalling(uri, this.cleanArchitectureCodeGenerator.generateExistingFeatureExpansion);


    async handleMethodCalling(uri: Uri, method: (args: { directory: string, fileName: string }) => Promise<void>) {
        try {
            const fileName = await promptForFileName();

            const directory: string = uri.fsPath;
            await this.cleanArchitectureCodeGenerator.generateNewFeature({ directory: directory, fileName: fileName });

            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    }
}









