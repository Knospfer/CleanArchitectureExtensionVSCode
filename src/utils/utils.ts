import { InputBoxOptions, window } from "vscode";

export function showCatchedErrorMessage(error: Error | Object | string) {
    let message: string = error instanceof Error ? error.message : JSON.stringify(error);
    window.showErrorMessage(message);
}

export function toPascalCase(fileName: string): string {
    const wordArrayCapitalized = fileName.split(/[_-\s]/g).map(w => {
        w.toLowerCase();
        return `${w[0].toUpperCase()}${w.slice(1)}`;
    });
    return wordArrayCapitalized.reduce((previousWord, currentWord) => previousWord + currentWord, "");
}

export function toSnakeCase(name: string): string {
    return name.toLowerCase().replace(/[_-\s]/g, "_");
}

export async function promptForFileName(): Promise<string> {
    const alertOptions: InputBoxOptions = {
        prompt: "File Name",
        placeHolder: "my-file"
    };
    const fileName = await window.showInputBox(alertOptions);
    if (!!fileName) {
        return fileName;
    }
    throw new Error("Error: file name is missing");
}

export function toSnakeCaseFiltered(name: string, ...wordsToFilter: string[]): string {
    return name.split(/[_-\s]/g)
        .filter(w => !wordsToFilter.find(f => f === w))
        .reduce((prev, current) => {
            if (!prev) {
                return current.toLowerCase();
            }
            return `${prev}_${current}`.toLowerCase();
        }, "");
}