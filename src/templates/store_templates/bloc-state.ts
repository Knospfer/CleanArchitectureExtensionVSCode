import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeState(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  abstract class ${pascalCaseFileName}State implements BaseState{
    const ${pascalCaseFileName}State();
  }
    
  class ${pascalCaseFileName}Empty extends ${pascalCaseFileName}State implements InitialState {}
    
  class ${pascalCaseFileName}Updated extends ${pascalCaseFileName}State implements LoadedState {
    final dynamic data;
    const ${pascalCaseFileName}Updated(this.data);
  }
    
  class ${pascalCaseFileName}Error extends ${pascalCaseFileName}State implements ErrorState {
    @override
    final String errorMessage;
    const ${pascalCaseFileName}Error(this.errorMessage);
  }`;
}