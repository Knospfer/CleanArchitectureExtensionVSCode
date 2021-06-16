import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeRepositoryConcrete(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "repository", "concrete");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "repository", "concrete", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "repository", "concrete", "imports");
  return `part of "../../${snakeCaseFileName}_imports.dart";

@LazySingleton(as: ${pascalCaseFileName}Repository)
class ${pascalCaseFileName}RepositoryConcrete implements ${pascalCaseFileName}Repository {
  final ${pascalCaseFileName}LocalDataSource dataSource;
    
  ${pascalCaseFileName}RepositoryConcrete(this.dataSource);
    
  @override
  Stream<Entity?> ${camelCaseFilename}() {
    return dataSource.${camelCaseFilename}().map((model) {
      //TODO implement method
      if (model != null) return null;
      return null;
    });
  }
}`;
}