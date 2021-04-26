import * as mkdirp from "mkdirp";

export interface DirectoryCreator {
    createDirectory(directory: string): Promise<void>
}

export class DirectoryCreatorConcrete implements DirectoryCreator {
    constructor() { }

    async createDirectory(directory: string): Promise<void> {
        await mkdirp(directory);
    }
}