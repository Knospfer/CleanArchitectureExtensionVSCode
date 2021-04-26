import { CodeFileCreator, CodeFileCreatorConcrete } from "../features/code-generation/code-creation-layer/code-file-creator";
import { DirectoryChecker, DirectoryCheckerConcrete } from "../features/code-generation/code-creation-layer/directory-checker";
import { DirectoryCreator, DirectoryCreatorConcrete } from "../features/code-generation/code-creation-layer/directory-creator";
import { TemplateCreator, TemplateCreatorConcrete } from "../features/code-generation/code-creation-layer/template-creator";
import { FileTemplateCreator, FileTemplateCreatorConrete } from "../features/code-generation/code-organization-layer/file-template-creator";
import { FolderStructureCreator, FolderStructureCreatorConcrete } from "../features/code-generation/code-organization-layer/folder-structure-creator";
import { CleanArchitectureCodeGenerator, CleanArchitectureCodeGeneratorConcrete } from "../features/code-generation/tree-creator-layer/clean-architecture-code-generator";
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