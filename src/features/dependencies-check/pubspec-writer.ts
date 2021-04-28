import { TextEncoder } from "util";
import { Uri, workspace } from "vscode";
import { PubspecReader } from "./pubspec-reader";
import { PubpsecPathGetter } from "./pusbpec-getter";

export interface PubspecWriter {
    writePubspec(): Promise<void>
}

export class PubspecWriterConcrete implements PubspecWriter {
    constructor(private pubGetter: PubpsecPathGetter, private pubReader: PubspecReader) { }

    async writePubspec() {
        if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
            const path = this.pubGetter.getPubspecPath();
            const arrayBuffer = await this.insertRowBeforeDevDependencies();

            await workspace.fs.writeFile(
                Uri.file(path),
                arrayBuffer
            );
        }
        throw Error("NO environment!!");
    }

    private async insertRowBeforeDevDependencies(): Promise<Uint8Array> {
        let decodedString = await this.pubReader.readPubspec();

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