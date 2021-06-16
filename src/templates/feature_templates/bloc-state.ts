import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function blocState(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  abstract class ${pascalCaseFileName}State implements BaseState{
    const ${pascalCaseFileName}State();
  }
    
  class ${pascalCaseFileName}InitialState extends ${pascalCaseFileName}State implements InitialState {}
    
  class ${pascalCaseFileName}LoadingState extends ${pascalCaseFileName}State implements LoadingState {}
    
  class ${pascalCaseFileName}LoadedState extends ${pascalCaseFileName}State implements LoadedState {}
    
  class ${pascalCaseFileName}ErrorState extends ${pascalCaseFileName}State implements ErrorState {
    @override
    final String errorMessage;
    const ${pascalCaseFileName}ErrorState(this.errorMessage);
  }`;
}