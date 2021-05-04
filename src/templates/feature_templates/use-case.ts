import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function useCase(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "use", "case", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "use", "case", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "use", "case", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";
    
class ${pascalCaseFileName}Params {
  final data;
    
  ${pascalCaseFileName}Params(this.data);
}
    
@lazySingleton
class ${pascalCaseFileName}UseCase implements UseCase<Entity, ${pascalCaseFileName}Params> {
  final ${pascalCaseFileName}Repository repository;
    
  ${pascalCaseFileName}UseCase(this.repository);
    
  @override
  Future<Either<Failure, Entity>> call(${pascalCaseFileName}Params params) async {
    return await repository.${camelCaseFilename}(params.data);
  }
}`;
}