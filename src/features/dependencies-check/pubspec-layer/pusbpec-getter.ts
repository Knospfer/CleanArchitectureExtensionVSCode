import { Uri, workspace } from "vscode";
import * as path from "path";
import * as yaml from "js-yaml";


export interface PubpsecGetter {
    getPubspec(): Promise<unknown>;
}

export interface PubpsecPathGetter {
    getPubspecPath(): string;
}

export class PubspecGetterConcrete implements PubpsecGetter, PubpsecPathGetter {
    async getPubspec(): Promise<unknown> {
        const pubspecPath = this.getPubspecPath();
        if (!!pubspecPath) {
            let content = await workspace.fs.readFile(Uri.file(pubspecPath));
            return yaml.load(content.toString());
        }
        throw Error("No pubspec!");
    }

    getPubspecPath(): string {
        if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
            return path.join(
                `${workspace.workspaceFolders[0].uri.path}`,
                "pubspec.yaml"
            );
        }
        throw Error("No Environment!");
    }

}