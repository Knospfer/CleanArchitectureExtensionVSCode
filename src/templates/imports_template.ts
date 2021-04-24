import { toSnakeCaseFiltered } from "../utils/utils";

export function imports(fileName: string) {
    const snakeCaseFileName = toSnakeCaseFiltered(fileName, "imports");
    return `import 'package:injectable/injectable.dart';
part "./data/data_source/${snakeCaseFileName}_remote_data_source.dart";`;
}