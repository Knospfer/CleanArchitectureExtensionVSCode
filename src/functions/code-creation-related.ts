import { existsSync, writeFile } from "fs";
import { createDirectory } from "./folder-related";

export async function generateFileCode(args: { fileName: string, directory: string }) {
    const { fileName, directory } = args;
    const directoryPath = `${directory}/${fileName}`;

    if (!existsSync(directoryPath)) {
        await createDirectory(directoryPath);
    }

    try {
        await createFileTemplate({ filename: fileName, directory: directoryPath });
    } catch (error){
        throw error;
    }
}


async function createFileTemplate(args: { filename: string, directory: string }): Promise<void> {
    const { filename, directory } = args;

    const finalPath = `${directory}/${filename}.ts`;

    if (existsSync(finalPath)) {
        throw Error(`${directory}/${filename}.ts alread exists!`);
    }

    const code = await getFileTemplate(filename);

    return new Promise((resolve, reject) => {
        writeFile(finalPath, code, (error) => {
            if (!!error) {
                reject(error);
                return;
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