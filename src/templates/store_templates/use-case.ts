import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeUseCase(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "use", "case", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "use", "case", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "use", "case", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";
    
@lazySingleton
class ${pascalCaseFileName}UseCase implements StreamUseCase<Entity?, NoParams> {
  final ${pascalCaseFileName}Repository repository;
    
  ${pascalCaseFileName}UseCase(this.repository);
    
  @override
  Stream<Entity?> call(NoParams params) {
    return repository.${camelCaseFilename}();
  }
}`;
}