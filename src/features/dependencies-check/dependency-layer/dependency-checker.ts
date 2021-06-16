import { window } from "vscode";
import { PubspecReader } from "../pubspec-layer/pubspec-reader";
import { PubspecWriter } from "../pubspec-layer/pubspec-writer";

export interface DependencyChecker {
    checkForDependencies(): Promise<void>;
}

export class DependencyCheckerConcrete implements DependencyChecker {
    private depenenciesToCheck = ["flutter_bloc", "injectable", "dartz", "get_it", "sembast"];
    private missingDependencies: string[] = [];

    constructor(private pubReader: PubspecReader, private pubWriter: PubspecWriter) { }

    async checkForDependencies(): Promise<void> {
        if (await this.checkForMissingDependencies()
            && await this.showUpdateMessage()) {
            this.pubWriter.writePubspec(...this.missingDependencies);
        }
        return;
    }

    private async checkForMissingDependencies(): Promise<boolean> {
        const stringifiedPub = await this.pubReader.readPubspec();

        for (let dep of this.depenenciesToCheck) {
            if (stringifiedPub.includes(dep)) { continue; }
            this.missingDependencies.push(dep);
        }

        return this.missingDependencies.length > 0;
    }

    private async showUpdateMessage(): Promise<boolean> {
        const warningMessage = "There are missing dependencies. Would you like to add them?";
        const action = await window.showWarningMessage(warningMessage, "Update", "Cancel");
        return action === "Update";
    }
}