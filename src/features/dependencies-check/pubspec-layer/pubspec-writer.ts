import { TextEncoder } from "util";
import { Uri, workspace } from "vscode";
import { PubspecReader } from "./pubspec-reader";
import { PubpsecPathGetter } from "./pusbpec-getter";

export interface PubspecWriter {
    writePubspec(...depencencies: string[]): Promise<void>
}

export class PubspecWriterConcrete implements PubspecWriter {
    constructor(private pubGetter: PubpsecPathGetter, private pubReader: PubspecReader) { }

    async writePubspec(...depencencies: string[]) {
        if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
            const path = this.pubGetter.getPubspecPath();
            const arrayBuffer = await this.insertRowBeforeDevDependencies(...depencencies);

            await workspace.fs.writeFile(
                Uri.file(path),
                arrayBuffer
            );
        }
        throw Error("NO environment!!");
    }

    private async insertRowBeforeDevDependencies(...depencencies: string[]): Promise<Uint8Array> {
        let decodedString = await this.pubReader.readPubspec();

        const concatDependencies = depencencies.reduce((prev, current) => {
            if (!!prev) { return `${prev}\n  ${current}:\n`; }
            return `${current}:\n`;
        }, "");

        decodedString = decodedString.split("dev_dependencies:")
            .reduce((prev, current) => {
                if (!!prev) {
                    return `${prev}  #auto generated dependencies\n  ${concatDependencies}dev_dependencies:${current}`;
                }
                return current;
            }, "");

        return new TextEncoder().encode(decodedString);
    }
}