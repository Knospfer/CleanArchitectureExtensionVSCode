import { TemplateEnum } from "../../enums/template-enum";
import { blocBloc } from "../../templates/bloc-bloc";
import { blocEvent } from "../../templates/bloc-event";
import { blocState } from "../../templates/bloc-state";
import { remoteDataSourceTemplate } from "../../templates/remote-data-source";
import { repository } from "../../templates/repository";
import { repositoryConcrete } from "../../templates/repository-concrete";
import { useCase } from "../../templates/use-case";
import { toPascalCase } from "../../utils/utils";

export interface TemplateCreator {
    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string
}

export class TemplateCreatorConcrete implements TemplateCreator {
    constructor() { }

    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string {
        const { fileName, template } = args;
        const pascalCaseName = toPascalCase(fileName);
        switch (template) {
            case TemplateEnum.remoteDataSource: return remoteDataSourceTemplate(pascalCaseName);
            case TemplateEnum.repositoryConcrete: return repositoryConcrete(pascalCaseName);
            case TemplateEnum.repository: return repository(pascalCaseName);
            case TemplateEnum.useCase: return useCase(pascalCaseName);
            case TemplateEnum.blocBloc: return blocBloc(pascalCaseName);
            case TemplateEnum.blocEvent: return blocEvent(pascalCaseName);
            case TemplateEnum.blocState: return blocState(pascalCaseName);
            default: throw Error("NO template found!");
        }
    }
}
