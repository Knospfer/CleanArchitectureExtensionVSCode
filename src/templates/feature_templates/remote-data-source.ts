import { toPascalCase, toSnakeCaseFiltered } from "../../utils/utils";

export function remoteDataSourceTemplate(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "remote", "data", "source");
  const pascalCaseFileName = toPascalCase(fileName);
  return `part of '../../${snakeCaseFileName}_imports.dart';
  
abstract class ${pascalCaseFileName} {
   //  TODO DECLARE METHOD
}
  
@LazySingleton(as: ${pascalCaseFileName})
class ${pascalCaseFileName}Concrete implements ${pascalCaseFileName} {
  const ${pascalCaseFileName}Concrete();
  
  //  TODO IMPLEMENT METHOD
}`;
}