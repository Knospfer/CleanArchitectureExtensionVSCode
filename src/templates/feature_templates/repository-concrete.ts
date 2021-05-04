import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function repositoryConcrete(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "repository", "concrete");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "repository", "concrete", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "repository", "concrete", "imports");
  return `part of "../../${snakeCaseFileName}_imports.dart";

@LazySingleton(as: ${pascalCaseFileName}Repository)
class ${pascalCaseFileName}RepositoryConcrete implements ${pascalCaseFileName}Repository {
  final ${pascalCaseFileName}RemoteDataSource dataSource;
    
  ${pascalCaseFileName}RepositoryConcrete(this.dataSource);
    
  @override
  Future<Either<Failure, Entity>> ${camelCaseFilename}(data) async {
    throw UnimplementedError();
  }
}`;
}