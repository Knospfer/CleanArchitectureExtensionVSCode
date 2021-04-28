import { TextDecoder } from "util";
import { Uri, workspace } from "vscode";
import { PubpsecPathGetter } from "./pusbpec-getter";

export interface PubspecReader {
    readPubspec(): Promise<string>;
}


export class PubspecReaderConcrete implements PubspecReader {

    constructor(private pubGetter: PubpsecPathGetter) { }

    async readPubspec(): Promise<string> {
        const pubspecPath = this.pubGetter.getPubspecPath();
        const arrayBuffer: Uint8Array = await workspace.fs.readFile(Uri.file(pubspecPath));
        let decodedString = new TextDecoder().decode(arrayBuffer);
        return decodedString;
    }

}
