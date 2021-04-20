// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NewFileDispatcher } from './commands/commands-handler';
import { DipendencyInjectionResolver } from './dipendency-injeciton/dipendency-injection-resolver';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const commandsHandler: NewFileDispatcher = DipendencyInjectionResolver.generateNewFileDispatcherSingleton();
	let disposable = vscode.commands.registerCommand('cleanarchitectureflutter.createsnippet', commandsHandler.newFile);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
