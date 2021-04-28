import { CodeFileCreator, CodeFileCreatorConcrete } from "../features/code-generation/code-creation-layer/code-file-creator";
import { DirectoryChecker, DirectoryCheckerConcrete } from "../features/code-generation/code-creation-layer/directory-checker";
import { DirectoryCreator, DirectoryCreatorConcrete } from "../features/code-generation/code-creation-layer/directory-creator";
import { TemplateCreator, TemplateCreatorConcrete } from "../features/code-generation/code-creation-layer/template-creator";
import { FileTemplateCreator, FileTemplateCreatorConrete } from "../features/code-generation/code-organization-layer/file-template-creator";
import { FolderStructureCreator, FolderStructureCreatorConcrete } from "../features/code-generation/code-organization-layer/folder-structure-creator";
import { CleanArchitectureCodeGenerator, CleanArchitectureCodeGeneratorConcrete } from "../features/code-generation/tree-creator-layer/clean-architecture-code-generator";
import { CommandsHandler, NewFileDispatcher } from "../commands/commands-handler";
import { DependencyChecker, DependencyCheckerConcrete } from "../features/dependencies-check/dependency-layer/dependency-checker";
import { PubspecGetterConcrete } from "../features/dependencies-check/pubspec-layer/pusbpec-getter";
import { PubspecReader, PubspecReaderConcrete } from "../features/dependencies-check/pubspec-layer/pubspec-reader";
import { PubspecWriter, PubspecWriterConcrete } from "../features/dependencies-check/pubspec-layer/pubspec-writer";

export class DipendencyInjectionResolver {
    private constructor() { }
    static generateNewFileDispatcherSingleton(): NewFileDispatcher {
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

    static generateDependencyCheckerSingleton(): DependencyChecker {
        const pubGetter = new PubspecGetterConcrete();
        const pubReader: PubspecReader = new PubspecReaderConcrete(pubGetter);
        const pubWriter: PubspecWriter = new PubspecWriterConcrete(pubGetter, pubReader);

        const dependencyChecker: DependencyChecker = new DependencyCheckerConcrete(pubReader, pubWriter);

        return dependencyChecker;
    }
}