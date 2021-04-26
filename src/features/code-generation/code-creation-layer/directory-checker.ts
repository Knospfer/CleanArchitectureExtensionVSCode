import { existsSync } from "fs";

export interface DirectoryChecker {
    checkDirectoryExistence(directory: string): boolean
}

export class DirectoryCheckerConcrete implements DirectoryChecker {
    constructor() { }
    
    checkDirectoryExistence(directory: string): boolean {
        return existsSync(directory);
    }

}