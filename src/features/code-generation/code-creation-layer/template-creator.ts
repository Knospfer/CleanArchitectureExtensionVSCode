import { TemplateEnum } from "../../../enums/template-enum";
import { basicBlocStates } from "../../../templates/core_templates/bloc-states";
import { coreUseCase } from "../../../templates/core_templates/core-use-case";
import { coreImports } from "../../../templates/core_templates/core_imports";
import { entity } from "../../../templates/core_templates/entity";
import { exception } from "../../../templates/core_templates/exception";
import { failure } from "../../../templates/core_templates/failure";
import { model } from "../../../templates/core_templates/model";
import { sharedImports } from "../../../templates/core_templates/shared-imports";
import { blocBloc } from "../../../templates/feature_templates/bloc-bloc";
import { blocEvent } from "../../../templates/feature_templates/bloc-event";
import { blocState } from "../../../templates/feature_templates/bloc-state";
import { imports } from "../../../templates/feature_templates/imports_template";
import { localDataSourceTemplate } from "../../../templates/feature_templates/local-data-source";
import { remoteDataSourceTemplate } from "../../../templates/feature_templates/remote-data-source";
import { repository } from "../../../templates/feature_templates/repository";
import { repositoryConcrete } from "../../../templates/feature_templates/repository-concrete";
import { useCase } from "../../../templates/feature_templates/use-case";
import { storeBloc } from "../../../templates/store_templates/bloc-bloc";
import { storeEvent } from "../../../templates/store_templates/bloc-event";
import { storeState } from "../../../templates/store_templates/bloc-state";
import { storeImports } from "../../../templates/store_templates/imports_template";
import { storeLocalDataSourceTemplate } from "../../../templates/store_templates/local-data-source";
import { storeRepository } from "../../../templates/store_templates/repository";
import { storeRepositoryConcrete } from "../../../templates/store_templates/repository-concrete";
import { storeUseCase } from "../../../templates/store_templates/use-case";

export interface TemplateCreator {
    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string
}

export class TemplateCreatorConcrete implements TemplateCreator {
    constructor() { }

    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string {
        const { fileName, template } = args;
        switch (template) {
            case TemplateEnum.remoteDataSource: return remoteDataSourceTemplate(fileName);
            case TemplateEnum.localDataSource: return localDataSourceTemplate(fileName);
            case TemplateEnum.repositoryConcrete: return repositoryConcrete(fileName);
            case TemplateEnum.repository: return repository(fileName);
            case TemplateEnum.useCase: return useCase(fileName);
            case TemplateEnum.blocBloc: return blocBloc(fileName);
            case TemplateEnum.blocEvent: return blocEvent(fileName);
            case TemplateEnum.blocState: return blocState(fileName);
            case TemplateEnum.imports: return imports(fileName);

            case TemplateEnum.storeBloc: return storeBloc(fileName);
            case TemplateEnum.storeEvent: return storeEvent(fileName);
            case TemplateEnum.storeState: return storeState(fileName);
            case TemplateEnum.storeImports: return storeImports(fileName);
            case TemplateEnum.storeLocalDataSource: return storeLocalDataSourceTemplate(fileName);
            case TemplateEnum.storeRepositoryConcrete: return storeRepositoryConcrete(fileName);
            case TemplateEnum.storeRepository: return storeRepository(fileName);
            case TemplateEnum.storeUseCase: return storeUseCase(fileName);

            case TemplateEnum.coreImports: return coreImports();
            case TemplateEnum.entity: return entity();
            case TemplateEnum.exception: return exception();
            case TemplateEnum.failure: return failure();
            case TemplateEnum.model: return model();
            case TemplateEnum.coreUseCase: return coreUseCase();
            case TemplateEnum.basicBlocStates: return basicBlocStates();

            case TemplateEnum.sharedImports: return sharedImports();

            default: throw Error("NO template found!");
        }
    }
}

