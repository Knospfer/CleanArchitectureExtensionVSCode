import { existsSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";

export async function generateFileCode(args: { fileName: string, directory: string }) {
    const { fileName, directory } = args;
    const directoryPath = `${directory}/${fileName}`;

    if (!existsSync(directoryPath)) {
        createDirectory(directoryPath);
    }
    await createFileTemplate({ filename: fileName, directory: directoryPath });
}

async function createDirectory(directory: string): Promise<void> {
    await mkdirp(directory);
}

async function createFileTemplate(args: { filename: string, directory: string }): Promise<void> {
    const { filename, directory } = args;

    const finalPath = `${directory}/${filename}.ts`;

    if (existsSync(finalPath)) {
        throw Error(`${directory}/${filename}.ts alread exists!`);
    }

    const code = await getFileTemplate(filename);

    return new Promise((resolve) => {
        writeFile(finalPath, code, (error) => {
            if (!!error) {
                throw new Error(error.message);
            }
            resolve();
        });
    });
}

function getFileTemplate(filename: string) {

    return `
        class ${filename.toUpperCase()} {
            hi(){
                console.log("hi! i'm your file!");
            }
        }
    `;
}


