import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeLocalDataSourceTemplate(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "local", "data", "source");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "local", "data", "source");
  const camelCaseFileName = toCamelCaseFiltered(fileName, "local", "data", "source");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  
abstract class ${pascalCaseFileName}LocalDataSource {
  Stream<Model?> ${camelCaseFileName}();
}
  
@LazySingleton(as: ${pascalCaseFileName}LocalDataSource)
class ${pascalCaseFileName}LocalDataSourceConcrete implements ${pascalCaseFileName}LocalDataSource {
  final Database database;
  final StoreRef<String, Map<String, dynamic>> storeRef = StoreRef.main(); //TODO update if needed with '''intMapStoreFactory.store("document_key");'''

  ${pascalCaseFileName}LocalDataSourceConcrete(this.database);
  
  @override
  Stream<Model?> ${camelCaseFileName}(){
   //TODO add key
   return storeRef.record("TO_IMPLEMENT").onSnapshot(database).map((event) {
     //TODO implement method
      if (event != null) return null;
      return null;
    });
  }
}`;
}