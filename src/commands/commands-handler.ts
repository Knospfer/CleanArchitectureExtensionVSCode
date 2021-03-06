import { Uri, window } from "vscode";
import { promptForFileName, showCatchedErrorMessage } from "../utils/utils";
import { CleanArchitectureCodeGenerator } from "../features/code-generation/tree-creator-layer/clean-architecture-code-generator";

export interface NewFileDispatcher {
    newFeature(uri: Uri): void;
    expandFeature(uri: Uri): void;
}

export interface StoreDispatcher {
    newStore(uri: Uri): void;
}

export interface CoreDispatcher {
    generateBasicStructure(uri: Uri): void;
}

export abstract class CommandsHandler implements NewFileDispatcher, CoreDispatcher, StoreDispatcher {
    newStore(uri: Uri): void {
        throw new Error("Method not implemented.");
    }
    generateBasicStructure(uri: Uri): void {
        throw new Error("Method not implemented.");
    }
    newFeature(uri: Uri): void {
        throw new Error("Method not implemented.");
    }
    expandFeature(uri: Uri): void {
        throw new Error("Method not implemented.");
    }
}

export class CommandsHandlerConcrete extends CommandsHandler {
    constructor(private cleanArchitectureCodeGenerator: CleanArchitectureCodeGenerator) { super(); }
    generateBasicStructure = async (uri: Uri) => {
        try {
            const directory: string = uri.fsPath;
            await this.cleanArchitectureCodeGenerator.generateBasicStructure(directory);
            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    };

    //in this way it will not loose this reference (arrow function doesn't have this)
    newFeature = async (uri: Uri) => {
        try {
            const fileName = await promptForFileName();
            const directory: string = uri.fsPath;

            await this.cleanArchitectureCodeGenerator.generateNewFeature({ fileName, directory });

            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    };

    expandFeature = async (uri: Uri) => {
        try {
            const fileName = await promptForFileName();
            const directory: string = uri.fsPath;

            await this.cleanArchitectureCodeGenerator.generateExistingFeatureExpansion({ fileName, directory });

            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    };

    newStore = async (uri: Uri) => {
        try {
            const fileName = await promptForFileName({
                prompt: "Es. user-store",
                placeHolder: "Store name"
            });
            const directory: string = uri.fsPath;

            await this.cleanArchitectureCodeGenerator.generateStore({ fileName, directory });

            window.showInformationMessage(`Code generated uccessfully!`);
        } catch (error) {
            showCatchedErrorMessage(error);
            throw error;
        }
    };
}









