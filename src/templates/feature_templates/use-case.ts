import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function useCase(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "use", "case", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "use", "case", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "use", "case", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";
    
class ${pascalCaseFileName}Params {
  final dynamic data;
    
  ${pascalCaseFileName}Params(this.data);
}
    
@lazySingleton
class ${pascalCaseFileName}UseCase implements UseCase<void, ${pascalCaseFileName}Params> {
  final ${pascalCaseFileName}Repository repository;
    
  ${pascalCaseFileName}UseCase(this.repository);
    
  @override
  Future<Either<Failure, void>> call(${pascalCaseFileName}Params params) async {
    return repository.${camelCaseFilename}(params.data);
  }
}`;
}