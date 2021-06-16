import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeEvent(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "event", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "event", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
  
abstract class ${pascalCaseFileName}BaseEvent {
  const ${pascalCaseFileName}BaseEvent();
} 

class DataFetched extends ${pascalCaseFileName}BaseEvent {
  final Entity? data;
  const DataFetched(this.data);
}`;
}