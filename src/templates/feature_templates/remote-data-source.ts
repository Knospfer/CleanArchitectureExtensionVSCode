import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function remoteDataSourceTemplate(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "remote", "data", "source");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "remote", "data", "source");
  const camelCaseFileName = toCamelCaseFiltered(fileName, "remote", "data", "source");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  
abstract class ${pascalCaseFileName}RemoteDataSource {
  Future<Model> ${camelCaseFileName}();
}
  
@LazySingleton(as: ${pascalCaseFileName}RemoteDataSource)
class ${pascalCaseFileName}RemoteDataSourceConcrete implements ${pascalCaseFileName}RemoteDataSource {
  const ${pascalCaseFileName}RemoteDataSourceConcrete();
  @override
  Future<Model> ${camelCaseFileName}(){
    //TODO implement method
    throw UnimplementedError();
  }
}`;
}