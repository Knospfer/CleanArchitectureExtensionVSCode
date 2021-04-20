import { CodeFileCreator, CodeFileCreatorConcrete } from "../classes/code-creation-layer/code-file-creator";
import { DirectoryChecker, DirectoryCheckerConcrete } from "../classes/code-creation-layer/directory-checker";
import { DirectoryCreator, DirectoryCreatorConcrete } from "../classes/code-creation-layer/directory-creator";
import { TemplateCreator, TemplateCreatorConcrete } from "../classes/code-creation-layer/template-creator";
import { FileTemplateCreator, FileTemplateCreatorConrete } from "../classes/code-organization-layer/file-template-creator";
import { FolderStructureCreator, FolderStructureCreatorConcrete } from "../classes/code-organization-layer/folder-structure-creator";
import { CleanArchitectureCodeGenerator, CleanArchitectureCodeGeneratorConcrete } from "../classes/tree-creator-layer/clean-architecture-code-generator";
import { CommandsHandler, NewFileDispatcher } from "../commands/commands-handler";

export class DipendencyInjectionResolver {
    private constructor(){}
    static generateNewFileDispatcherSingleton() : NewFileDispatcher {
        const codeFileCreator: CodeFileCreator = new CodeFileCreatorConcrete();
        const directoryChecker: DirectoryChecker = new DirectoryCheckerConcrete();
        const directoryCreator: DirectoryCreator = new DirectoryCreatorConcrete();
        const templateCreator: TemplateCreator = new TemplateCreatorConcrete();

        const fileTemplateCreator: FileTemplateCreator = new FileTemplateCreatorConrete(codeFileCreator, templateCreator, directoryChecker);
        const folderStructureCreator: FolderStructureCreator = new FolderStructureCreatorConcrete(directoryCreator, directoryChecker);

        const cleanArchitectureCodeGenerator: CleanArchitectureCodeGenerator = new CleanArchitectureCodeGeneratorConcrete(folderStructureCreator, fileTemplateCreator);

        const commandsHandler: NewFileDispatcher = new CommandsHandler(cleanArchitectureCodeGenerator); 
        return commandsHandler;
    }
}