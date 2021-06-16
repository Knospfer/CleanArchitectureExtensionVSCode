// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandsHandler } from './commands/commands-handler';
import { DipendencyInjectionResolver } from './dipendency-injeciton/dipendency-injection-resolver';
import { DependencyChecker } from './features/dependencies-check/dependency-layer/dependency-checker';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	const commandsHandler: CommandsHandler = DipendencyInjectionResolver.generateCommandsHandlerSingleton();
	const dependencyChecker: DependencyChecker = DipendencyInjectionResolver.generateDependencyCheckerSingleton();

	await dependencyChecker.checkForDependencies();

	const newFeat = vscode.commands.registerCommand('cleanarchitectureflutter.newfeature', commandsHandler.newFeature);
	const expandFeat = vscode.commands.registerCommand('cleanarchitectureflutter.expandfeature', commandsHandler.expandFeature);
	const newStore = vscode.commands.registerCommand('cleanarchitectureflutter.newstore', commandsHandler.newStore);

	context.subscriptions.push(newFeat, expandFeat, newStore);
}

// this method is called when your extension is deactivated
export function deactivate() { }
