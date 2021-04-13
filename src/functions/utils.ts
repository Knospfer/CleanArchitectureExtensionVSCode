import { window } from "vscode";

export function showCatchedErrorMessage(error: Error | Object | string) {
    let message : string = error instanceof Error ? error.message : JSON.stringify(error);
    window.showErrorMessage(message);
}