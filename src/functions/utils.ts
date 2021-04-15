import { window } from "vscode";

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