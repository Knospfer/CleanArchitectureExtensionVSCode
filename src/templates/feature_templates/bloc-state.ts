import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function blocState(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
    return `part of '../../../${snakeCaseFileName}_imports.dart';
  abstract class ${pascalCaseFileName}State {
    const ${pascalCaseFileName}State();
  }
    
  class ${pascalCaseFileName}Initial extends ${pascalCaseFileName}State {}
    
  class ${pascalCaseFileName}Loading extends ${pascalCaseFileName}State {}
    
  class ${pascalCaseFileName}Loaded extends ${pascalCaseFileName}State {}
    
  class ${pascalCaseFileName}Error extends ${pascalCaseFileName}State {}`;
}