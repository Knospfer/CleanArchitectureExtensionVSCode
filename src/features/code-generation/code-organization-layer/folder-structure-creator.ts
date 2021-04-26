import { toSnakeCase } from "../../../utils/utils";
import { DirectoryChecker } from "../code-creation-layer/directory-checker";
import { DirectoryCreator } from "../code-creation-layer/directory-creator";

export interface FolderStructureCreator {
    generateFolderStructure(skipSuffix: boolean, ...directories: string[]): Promise<string>
}

export class FolderStructureCreatorConcrete implements FolderStructureCreator {

    constructor(private directoryCreator: DirectoryCreator, private directoryChecker: DirectoryChecker) { }

    async generateFolderStructure(skipSuffix: boolean, ...directories: string[]): Promise<string> {
        if (!!skipSuffix) {
            directories.pop();
        }

        const directoryPath = directories.reduce((prev, current) => {
            if (!!prev) {
                return `${prev}/` + toSnakeCase(current);
            }
            return toSnakeCase(current);
        }, "");

        if (!this.directoryChecker.checkDirectoryExistence(directoryPath)) {
            await this.directoryCreator.createDirectory(directoryPath);
        }

        return directoryPath;
    }
}