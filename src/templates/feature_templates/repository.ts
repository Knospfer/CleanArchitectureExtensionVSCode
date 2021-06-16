import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";


export function repository(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "repository", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "repository", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "repository", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";

abstract class ${pascalCaseFileName}Repository {
  Future<Either<Failure, void>> ${camelCaseFilename}(dynamic data);
} `;
}