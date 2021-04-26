import { writeFile } from "fs";

export interface CodeFileCreator {
    createFileCode(args: { filePath: string, code: string }): Promise<void>
}

export class CodeFileCreatorConcrete implements CodeFileCreator {
    constructor() { }

    createFileCode(args: { filePath: string, code: string }): Promise<void> {
        const { filePath, code } = args;
        return new Promise((resolve, reject) => {
            writeFile(filePath, code, (error) => {
                if (!!error) {
                    reject(error.message);
                }
                resolve();
            });
        });
    }
}