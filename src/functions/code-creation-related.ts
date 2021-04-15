import { existsSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";
import { toPascalCase, toSnakeCase } from "./utils";

export async function generateFileCode(args: { fileName: string, directory: string }) {
    const { fileName, directory } = args;

    const snakeCaseFileName = toSnakeCase(fileName);
    const snakeCaseDirectory = toSnakeCase(directory);
    
    const directoryPath = `${snakeCaseDirectory}/${snakeCaseFileName}`;

    if (!existsSync(directoryPath)) {
       await createDirectory(directoryPath);
    }
    await createFileTemplate({ filename: snakeCaseFileName, directory: directoryPath });
}

async function createDirectory(directory: string): Promise<void> {
    await mkdirp(directory);
}

function createFileTemplate(args: { filename: string, directory: string }): Promise<void> {
    const { filename, directory } = args;

    const finalPath = `${directory}/${filename}.dart`;

    if (existsSync(finalPath)) {
        throw Error(`${directory}/${filename}.dart alread exists!`);
    }

    const code = getFileTemplate(filename);

    return new Promise((resolve, reject) => {
        writeFile(finalPath, code, (error) => {
            if (!!error) {
                reject(error.message);
            }
            resolve();
        });
    });
}

function getFileTemplate(filename: string) {
    const pascalCaseName = toPascalCase(filename);

    return `
    import 'package:injectable/injectable.dart';

abstract class ${pascalCaseName}RemoteDataSource {
  //  TODO DECLARE METHOD
}

@LazySingleton(as: ${pascalCaseName}RemoteDataSource)
class ${pascalCaseName}RemoteDataSourceConcrete implements ${pascalCaseName}RemoteDataSource {

  const ${pascalCaseName}RemoteDataSourceConcrete();

  //  TODO IMPLEMENT METHOD
}
    `;
}


