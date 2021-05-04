import { toSnakeCaseFiltered } from "../../utils/utils";

export function imports(fileName: string) {
    const snakeCaseFileName = toSnakeCaseFiltered(fileName, "imports");
    return `import 'package:bloc_library/_core/core_imports.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
part "./data/data_source/remote_data_source/${snakeCaseFileName}_remote_data_source.dart";
part "./data/repository_concrete/${snakeCaseFileName}_repository_concrete.dart";
part "./domain/repository/${snakeCaseFileName}_repository.dart";
part './domain/use_case/${snakeCaseFileName}_use_case.dart';
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_bloc.dart";
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_event.dart";
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_state.dart";`;
}