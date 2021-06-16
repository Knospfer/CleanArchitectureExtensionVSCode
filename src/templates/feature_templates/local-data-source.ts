import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function localDataSourceTemplate(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "local", "data", "source");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "local", "data", "source");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  
abstract class ${pascalCaseFileName}LocalDataSource {
    Future<void> cacheData(Model model);
}
  
@LazySingleton(as: ${pascalCaseFileName}LocalDataSource)
class ${pascalCaseFileName}LocalDataSourceConcrete implements ${pascalCaseFileName}LocalDataSource {
  ${pascalCaseFileName}LocalDataSourceConcrete();
  @override
  Future<void> cacheData(Model model){
    //TODO implement method
    throw UnimplementedError();
  }
}`;
}