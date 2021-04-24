import { toPascalCaseFiltered, toSnakeCaseFiltered } from "../utils/utils";

export function blocEvent(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "event", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "event", "imports");
  return `part of '../../../${snakeCaseFileName}_imports.dart';
abstract class ${pascalCaseFileName}Event {
  const ${pascalCaseFileName}Event();
} `;
}