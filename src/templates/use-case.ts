import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../utils/utils";

export function useCase(fileName: string) {
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "use", "case", "imports");
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "use", "case", "imports");

  return `part of "../../${snakeCaseFileName}_imports.dart";
    
class ${pascalCaseFileName}Params {
  final TO_IMPLEMET data;
    
  ${pascalCaseFileName}Params(this.data);
}
    
@lazySingleton
class ${pascalCaseFileName}UseCase implements UseCase<TO_IMPLEMENT, ${pascalCaseFileName}Params> {
  final ${pascalCaseFileName}Repositoy repositoy;
    
  ${pascalCaseFileName}UseCase(this.repositoy);
    
  @override
  Future<Either<Failure, TO_IMPLEMENT>> call(${fileName}Params params) async {
    return await repositoy.METHOD(params.data);
  }
}`;
}