import { TemplateEnum } from "../../enums/template-enum";
import { toPascalCase } from "../../utils/utils";

export interface TemplateCreator {
    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string
}

export class TemplateCreatorConcrete implements TemplateCreator {
    constructor() { }

    generateTemplateCode(args: { fileName: string, template: TemplateEnum }): string {
        const { fileName, template } = args;
        switch (template) {
            case TemplateEnum.remoteDataSource: return this.remoteDataSourceTemplate(fileName);
            default: return this.remoteDataSourceTemplate(fileName);
            //TODO tutti i templates
        }
    }

    private remoteDataSourceTemplate(fileName: string) {
        const pascalCaseName = toPascalCase(fileName);

        return `import 'package:injectable/injectable.dart';

        abstract class ${pascalCaseName}RemoteDataSource {
          //  TODO DECLARE METHOD
        }
        
        @LazySingleton(as: ${pascalCaseName}RemoteDataSource)
        class ${pascalCaseName}RemoteDataSourceConcrete
            implements ${pascalCaseName}RemoteDataSource {
          const ${pascalCaseName}RemoteDataSourceConcrete();
        
          //  TODO IMPLEMENT METHOD
        }`;
    }
}
