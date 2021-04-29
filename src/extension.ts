// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NewFileDispatcher } from './commands/commands-handler';
import { DipendencyInjectionResolver } from './dipendency-injeciton/dipendency-injection-resolver';
import { DependencyChecker } from './features/dependencies-check/dependency-layer/dependency-checker';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	const commandsHandler: NewFileDispatcher = DipendencyInjectionResolver.generateNewFileDispatcherSingleton();
	const dependencyChecker: DependencyChecker = DipendencyInjectionResolver.generateDependencyCheckerSingleton();

	await dependencyChecker.checkForDependencies();

	let newFeat = vscode.commands.registerCommand('cleanarchitectureflutter.newfeature', commandsHandler.newFeature);
	let expandFeat = vscode.commands.registerCommand('cleanarchitectureflutter.expandfeature', commandsHandler.expandFeature);

	context.subscriptions.push(newFeat, expandFeat);
}

// this method is called when your extension is deactivated
export function deactivate() { }
