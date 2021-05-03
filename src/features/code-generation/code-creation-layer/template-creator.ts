import { TemplateEnum } from "../../../enums/template-enum";
import { blocBloc } from "../../../templates/feature_templates/bloc-bloc";
import { blocEvent } from "../../../templates/feature_templates/bloc-event";
import { blocState } from "../../../templates/feature_templates/bloc-state";
import { imports } from "../../../templates/feature_templates/imports_template";
import { remoteDataSourceTemplate } from "../../../templates/feature_templates/remote-data-source";
import { repository } from "../../../templates/feature_templates/repository";
import { repositoryConcrete } from "../../../templates/feature_templates/repository-concrete";
import { useCase } from "../../../templates/feature_templates/use-case";

export interface TemplateCreator {
    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string
}

export class TemplateCreatorConcrete implements TemplateCreator {
    constructor() { }

    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string {
        const { fileName, template } = args;
        switch (template) {
            case TemplateEnum.remoteDataSource: return remoteDataSourceTemplate(fileName);
            case TemplateEnum.repositoryConcrete: return repositoryConcrete(fileName);
            case TemplateEnum.repository: return repository(fileName);
            case TemplateEnum.useCase: return useCase(fileName);
            case TemplateEnum.blocBloc: return blocBloc(fileName);
            case TemplateEnum.blocEvent: return blocEvent(fileName);
            case TemplateEnum.blocState: return blocState(fileName);
            case TemplateEnum.imports: return imports(fileName);
            default: throw Error("NO template found!");
        }
    }
}
