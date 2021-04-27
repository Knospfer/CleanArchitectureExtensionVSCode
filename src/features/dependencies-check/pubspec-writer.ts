import { TextDecoder, TextEncoder } from "util";
import { Uri, workspace } from "vscode";
import { PubspecGetterConcrete } from "./pusbpec-getter";

export interface PubspecWriter {
    writePubspec(): Promise<void>
}

export class PubspecWriterConcrete implements PubspecWriter {
    async writePubspec() {
        if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
            const getter = new PubspecGetterConcrete(); //TODO DI!!!!
            const path = getter.getPubspecPath();
            const arrayBuffer = await this.insertRowBeforeDevDependencies(path);
            
            await workspace.fs.writeFile(
                Uri.file(path),
                arrayBuffer
            );
        }
        throw Error("NO environment!!");
    }

    private async insertRowBeforeDevDependencies(pubspecPath: string): Promise<Uint8Array> {
        const arrayBuffer: Uint8Array = await workspace.fs.readFile(Uri.file(pubspecPath));
        let decodedString = new TextDecoder().decode(arrayBuffer);

        decodedString = decodedString.split("dev_dependencies:")
            .reduce((prev, current) => {
                if (!!prev) {
                    return `${prev}  #auto generated dependencies\n  flutter_bloc:\n  injectable:\n  dartz:\ndev_dependencies:${current}`;
                }
                return current;
            }, "");

        return new TextEncoder().encode(decodedString);
    }
}