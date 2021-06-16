import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";


export function storeRepository(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "repository", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "repository", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "repository", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";

abstract class ${pascalCaseFileName}Repository {
  Stream<Entity?> ${camelCaseFilename}();
} `;
}