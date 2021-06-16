import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function blocEvent(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "event", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "event", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
abstract class ${pascalCaseFileName}BaseEvent {
  const ${pascalCaseFileName}BaseEvent();
} 

class ${pascalCaseFileName}Event extends ${pascalCaseFileName}BaseEvent {
  final dynamic data;
  const ${pascalCaseFileName}Event(this.data);
}`;
}