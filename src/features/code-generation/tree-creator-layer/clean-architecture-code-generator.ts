import { TemplateEnum } from "../../../enums/template-enum";
import { FileTemplateCreator } from "../code-organization-layer/file-template-creator";
import { FolderStructureCreator } from "../code-organization-layer/folder-structure-creator";

export interface CleanArchitectureCodeGenerator {
    generateNewFeature(args: { fileName: string, directory: string }): Promise<void>
    generateExistingFeatureExpansion(args: { fileName: string, directory: string }): Promise<void>
    generateBasicStructure(directory: string): Promise<void>
}

export class CleanArchitectureCodeGeneratorConcrete implements CleanArchitectureCodeGenerator {
    constructor(private folderStructureCreator: FolderStructureCreator, private fileTemplateCreator: FileTemplateCreator) {
    }

    async generateNewFeature(args: { fileName: string, directory: string }): Promise<void> {
        const { fileName, directory } = args;
        await Promise.all([
            this.generateFileCode({ template: TemplateEnum.imports, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "features", fileName, "imports"),
            this.generateFileCode({ template: TemplateEnum.remoteDataSource, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "features", fileName, "data", "data_source", "remote_data_source"),
            this.generateFileCode({ template: TemplateEnum.localDataSource, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "features", fileName, "data", "data_source", "local_data_source"),
            this.generateFileCode({ template: TemplateEnum.repositoryConcrete, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "features", fileName, "data", "repository_concrete"),
            this.generateFileCode({ template: TemplateEnum.repository, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "features", fileName, "domain", "repository"),
            this.generateFileCode({ template: TemplateEnum.useCase, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "features", fileName, "domain", "use_case"),
            this.generateFileCode({ template: TemplateEnum.blocBloc, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "features", fileName, "presentation", "bloc", fileName, "bloc"),
            this.generateFileCode({ template: TemplateEnum.blocEvent, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "features", fileName, "presentation", "bloc", fileName, "event"),
            this.generateFileCode({ template: TemplateEnum.blocState, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "features", fileName, "presentation", "bloc", fileName, "state")
        ]);
    }

    async generateExistingFeatureExpansion(args: { fileName: string; directory: string; }): Promise<void> {
        const { fileName, directory } = args;
        await Promise.all([
            this.generateFileCode({ template: TemplateEnum.imports, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "imports"),
            this.generateFileCode({ template: TemplateEnum.remoteDataSource, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "data", "data_source", "remote_data_source"),
            this.generateFileCode({ template: TemplateEnum.repositoryConcrete, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "data", "repository_concrete"),
            this.generateFileCode({ template: TemplateEnum.repository, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "domain", "repository"),
            this.generateFileCode({ template: TemplateEnum.useCase, fileName: fileName, skipDirectorySuffix: false, hasFileNameSuffix: true }, directory, "domain", "use_case"),
            this.generateFileCode({ template: TemplateEnum.blocBloc, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "presentation", "bloc", fileName, "bloc"),
            this.generateFileCode({ template: TemplateEnum.blocEvent, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "presentation", "bloc", fileName, "event"),
            this.generateFileCode({ template: TemplateEnum.blocState, fileName: fileName, skipDirectorySuffix: true, hasFileNameSuffix: true }, directory, "presentation", "bloc", fileName, "state")
        ]);
    }

    async generateBasicStructure(directory: string): Promise<void> {
        await Promise.all([
            this.generateFileCode({ template: TemplateEnum.coreImports, fileName: "core_imports", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core"),
            this.generateFileCode({ template: TemplateEnum.entity, fileName: "entity", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.exception, fileName: "exception", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.failure, fileName: "failure", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.model, fileName: "model", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.coreUseCase, fileName: "use_case", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.basicBlocStates, fileName: "bloc_states", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_core", "basic_interfaces"),
            this.generateFileCode({ template: TemplateEnum.sharedImports, fileName: "shared_imports", skipDirectorySuffix: false, hasFileNameSuffix: false }, directory, "_shared"),

            this.generateEmptyFolder(directory, "_core", "constants"),
            this.generateEmptyFolder(directory, "_core", "interceptors"),
            this.generateEmptyFolder(directory, "_core", "modules"),
            this.generateEmptyFolder(directory, "_core", "routes"),

            this.generateEmptyFolder(directory, "_shared", "entities"),
            this.generateEmptyFolder(directory, "_shared", "features"),
            this.generateEmptyFolder(directory, "_shared", "models"),
            this.generateEmptyFolder(directory, "_shared", "utils"),
            this.generateEmptyFolder(directory, "_shared", "widgets"),

        ]);
    }

    private async generateFileCode(args: { template: TemplateEnum, fileName: string, skipDirectorySuffix: boolean, hasFileNameSuffix: boolean }, ...directories: string[]) {
        const { template, fileName, skipDirectorySuffix, hasFileNameSuffix } = args;
        const suffix = directories[directories.length - 1];
        const directoryPath = await this.folderStructureCreator.generateFolderStructure(skipDirectorySuffix, ...directories);

        await this.fileTemplateCreator.createFileTemplate({
            fileName: fileName,
            directory: directoryPath,
            suffix: suffix,
            template: template,
            hasFileNameSuffix: hasFileNameSuffix
        });
    }

    private async generateEmptyFolder(...directories: string[]): Promise<void> {
        await this.folderStructureCreator.generateFolderStructure(false, ...directories);
    }
}