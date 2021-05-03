import { TemplateEnum } from "../../../enums/template-enum";
import { toSnakeCase } from "../../../utils/utils";
import { CodeFileCreator } from "../code-creation-layer/code-file-creator";
import { DirectoryChecker } from "../code-creation-layer/directory-checker";
import { TemplateCreator } from "../code-creation-layer/template-creator";

export interface FileTemplateCreator {
    createFileTemplate(args: { fileName: string, directory: string, suffix: string, template: TemplateEnum, hasFileNameSuffix: boolean }): Promise<void>
}

export class FileTemplateCreatorConrete implements FileTemplateCreator {
    constructor(
        private codeCreator: CodeFileCreator,
        private templateCreator: TemplateCreator,
        private directoryChecker: DirectoryChecker) { }

    async createFileTemplate(args: { fileName: string, directory: string, suffix: string, template: TemplateEnum, hasFileNameSuffix: boolean }): Promise<void> {
        const { fileName, directory, suffix, template, hasFileNameSuffix } = args;

        let snakeCasefileName = toSnakeCase(fileName);
        if (hasFileNameSuffix) {
            snakeCasefileName = `${snakeCasefileName}_${suffix}`;
        }
        const finalPath = `${directory}/${snakeCasefileName}.dart`;

        if (this.directoryChecker.checkDirectoryExistence(finalPath)) {
            throw Error(`${directory}/${snakeCasefileName}.dart alread exists!`);
        }

        const code = this.templateCreator
            .generateTemplateCode({ fileName: snakeCasefileName, template: template });

        return this.codeCreator.createFileCode({ filePath: finalPath, code: code });
    }
}