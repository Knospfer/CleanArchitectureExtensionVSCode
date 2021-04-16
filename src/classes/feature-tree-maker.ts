import { existsSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";
import { toPascalCase, toSnakeCase } from "../functions/utils";

export interface CodeGenerator {
    generateStrucureCode(): Promise<void>
}

export class FeatureTreeMaker implements CodeGenerator {
    private fileName: string;
    private directory: string;

    constructor(args: { fileName: string, directory: string }) {
        const { fileName, directory } = args;
        this.fileName = fileName;
        this.directory = directory;
    }

    async generateStrucureCode(): Promise<void> {
        await Promise.all([
            this.generateFileCode(this.fileName, this.directory, "features", this.fileName, "data", "data_source",),
            this.generateFileCode(this.fileName, this.directory, "features", this.fileName, "data", "repository_concrete")
        ]);
    }

    private async generateFileCode(fileName: string, ...directories: string[]) {

        const suffix = directories[directories.length - 1];

        const directoryPath = directories.reduce((prev, current) => {
            if (!!prev) {
                return `${prev}/` + toSnakeCase(current);
            }
            return toSnakeCase(current);
        }, "");

        if (!existsSync(directoryPath)) {
            await this.createDirectory(directoryPath);
        }
        await this.createFileTemplate({ fileName: fileName, directory: directoryPath, suffix: suffix});
    }

    private async createDirectory(directory: string): Promise<void> {
        await mkdirp(directory);
    }

    private async createFileTemplate(args: { fileName: string, directory: string , suffix: string}): Promise<void> {
        const { fileName, directory, suffix } = args;

        const snakeCasefileName =  `${toSnakeCase(fileName)}_${suffix}`;

        const finalPath = `${directory}/${snakeCasefileName}.dart`;

        if (existsSync(finalPath)) {
            throw Error(`${directory}/${snakeCasefileName}.dart alread exists!`);
        }

        const code = this.getFileTemplate(snakeCasefileName);

        return new Promise((resolve, reject) => {
            writeFile(finalPath, code, (error) => {
                if (!!error) {
                    reject(error.message);
                }
                resolve();
            });
        });
    }

    //TODO remove
    private getFileTemplate(fileName: string) {
        const pascalCaseName = toPascalCase(fileName);

        return `import 'package:injectable/injectable.dart';

        abstract class ${pascalCaseName}RemoteDataSource {
          //  TODO DECLARE METHOD
        }
        
        @LazySingleton(as: ${pascalCaseName}RemoteDataSource)
        class ${pascalCaseName}RemoteDataSourceConcrete
            implements ${pascalCaseName}RemoteDataSource {
          const ${pascalCaseName}RemoteDataSourceConcrete();
        
          //  TODO IMPLEMENT METHOD
        }`;
    }
}