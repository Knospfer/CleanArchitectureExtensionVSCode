import { TemplateEnum } from "../../enums/template-enum";
import { FileTemplateCreator } from "../code-organization-layer/file-template-creator";
import { FolderStructureCreator } from "../code-organization-layer/folder-structure-creator";

export interface CleanArchitectureCodeGenerator {
    generateStrucureCode(args: { fileName: string, directory: string }): Promise<void>
}

export class CleanArchitectureCodeGeneratorConcrete implements CleanArchitectureCodeGenerator {
    constructor(private folderStructureCreator: FolderStructureCreator, private fileTemplateCreator: FileTemplateCreator) {
    }

    async generateStrucureCode(args: { fileName: string, directory: string }): Promise<void> {
        const { fileName, directory } = args;
        await Promise.all([
            this.generateFileCode(TemplateEnum.remoteDataSource ,fileName, false, directory, "features", fileName, "data", "data_source",),
            this.generateFileCode(TemplateEnum.repositoryConcrete ,fileName, false, directory, "features", fileName, "data", "repository_concrete"),
            this.generateFileCode(TemplateEnum.repository ,fileName, false, directory, "features", fileName, "domain", "repository"),
            this.generateFileCode(TemplateEnum.useCase ,fileName, false, directory, "features", fileName, "domain", "use_case"),
            this.generateFileCode(TemplateEnum.blocBloc ,fileName, true, directory, "features", fileName, "presentation", "bloc", fileName, "bloc"),
            this.generateFileCode(TemplateEnum.blocEvent ,fileName, true, directory, "features", fileName, "presentation", "bloc", fileName, "event"),
            this.generateFileCode(TemplateEnum.blocState ,fileName, true, directory, "features", fileName, "presentation", "bloc", fileName, "state")
        ]);
    }

    private async generateFileCode(template: TemplateEnum, fileName: string, skipSuffix: boolean = false, ...directories: string[]) {
        const suffix = directories[directories.length - 1];
        const directoryPath = await this.folderStructureCreator.generateFolderStructure(skipSuffix, ...directories);

        await this.fileTemplateCreator.createFileTemplate({
            fileName: fileName,
            directory: directoryPath,
            suffix: suffix,
            template: template
        });
    }
}